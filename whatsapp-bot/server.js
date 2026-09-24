require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3001;
const OPENWA_BASE_URL = process.env.OPENWA_BASE_URL || "http://localhost:2785";
const OPENWA_API_KEY = process.env.OPENWA_API_KEY || "";
const SESSION_ID = process.env.SESSION_ID || "";
const OWNER_NUMBER = process.env.OWNER_NUMBER || "";

const faq = JSON.parse(fs.readFileSync(path.join(__dirname, "faq.json"), "utf8"));
const ORDERS_FILE = path.join(__dirname, "orders.json");

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveOrder(order) {
  const orders = readOrders();
  orders.unshift(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097F\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findProduct(text) {
  const t = normalize(text);
  return faq.products.find((p) => {
    const keys = [p.key, p.name, p.hindiName];
    return keys.some((k) => k && t.includes(normalize(k)));
  });
}

function greeting() {
  return `Namaste! 🙏 Main Organic Swaad ka assistant hoon.\n\nMain in cheezon mein madad kar sakta hoon:\n• Masalon ke baare mein jaankari (haldi, mirch, dhaniya, jeera, garam masala)\n• Price list\n• Delivery aur payment details\n• Order kaise karein\n\nKya jaanna hai?`;
}

function priceList() {
  const lines = faq.products.map(
    (p) => `▫️ ${p.name} (${p.weight}) — ₹${p.price} (MRP ₹${p.originalPrice})`
  );
  return `${faq.brand} — Price List 🛒\n\n${lines.join("\n")}\n\n${faq.payment}\n\nOrder karne ke liye product ka naam bhejein.`;
}

function getReply(text) {
  const t = normalize(text);

  if (!t) return greeting();

  if (/^(hi|hello|hey|namaste|namaskar|hii|helo)\b/.test(t)) return greeting();

  if (t.includes("price") || t.includes("pricelist") || t.includes("daam") || t.includes("rate") || t.includes("kitne") || t.includes("list")) {
    return priceList();
  }

  if (t.includes("order") && (t.includes("karna") || t.includes("karna hai") || t.includes("chahiye") || t.includes("kar"))) {
    const p = findProduct(t);
    if (p) {
      return `Bahut badhiya choice! ✅\n\n*${p.name}* (${p.hindiName})\nWeight: ${p.weight}\nPrice: ₹${p.price} (MRP ₹${p.originalPrice})\n\n${p.desc}\n\nOrder confirm karne ke liye apna *naam, mobile number aur delivery address* bhejein. 📦`;
    }
    return `Order karne ke liye product ka naam bataiye (jaise: haldi, garam masala, combo). Ya price list ke liye *price* likhein.`;
  }

  const p = findProduct(t);
  if (p && (t.includes("kya hai") || t.includes("jankari") || t.includes("detail") || t.includes("bataye") || t.includes("about") || t.length <= 30)) {
    return `${p.name} (${p.hindiName}) 🌿\n\n${p.desc}\n\nWeight: ${p.weight}\nPrice: ₹${p.price} (MRP ₹${p.originalPrice})\n\nOrder ke liye *order* likhein ya seedha address bhejein.`;
  }

  if (t.includes("delivery") || t.includes("ship") || t.includes("pahunch") || t.includes("parcel")) {
    return faq.delivery;
  }

  if (t.includes("payment") || t.includes("cod") || t.includes("upi") || t.includes("pay")) {
    return faq.payment;
  }

  if (t.includes("combo")) {
    const combo = faq.products.find((x) => x.key === "combo");
    return `${combo.name} 🎁\n${combo.desc}\n\nPrice: ₹${combo.price} (MRP ₹${combo.originalPrice}) — ${combo.weight}\n\nOrder ke liye apna naam, mobile aur address bhejein.`;
  }

  if (t.includes("contact") || t.includes("number") || t.includes("call") || t.includes("whatsapp")) {
    return `Humse rabta karein:\n📞 ${faq.whatsapp ? "WhatsApp: " + faq.whatsapp : ""}\n📧 ${faq.email}\n📍 ${faq.address}`;
  }

  if (t.includes("track") || t.includes("status")) {
    return `Order track karne ke liye apna *Order ID* (OSxxxxxx) bhejein.`;
  }

  return `Maafjiye, main samjha nahi. 🙏\n\nMain inmein madad kar sakta hoon:\n• *price* — poori price list\n• *haldi / mirch / dhaniya / jeera / garam masala / combo* — product info\n• *delivery* — delivery details\n• *payment* — COD/UPI info\n• *order* — order kaise karein\n\nYa seedha human se baat karne ke liye ${faq.whatsapp ? "yahan message karein: " + faq.whatsapp : "hamein email karein: " + faq.email}`;
}

async function sendWhatsApp(to, text) {
  if (!OPENWA_API_KEY) {
    console.log(`[demo reply] to=${to}: ${text.split("\n")[0]}`);
    return { ok: false, reason: "OPENWA_API_KEY missing" };
  }
  try {
    const res = await fetch(`${OPENWA_BASE_URL}/api/sendText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: OPENWA_API_KEY,
      },
      body: JSON.stringify({ session: SESSION_ID, chatId: to, text }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error("sendWhatsApp error:", err.message);
    return { ok: false, error: err.message };
  }
}

function extractMessage(body) {
  return (
    body?.text?.body ||
    body?.message?.body ||
    body?.message ||
    body?.text ||
    ""
  );
}

function extractFrom(body) {
  return body?.from || body?.chatId || body?.chat?.id || body?.sender || "";
}

app.get("/health", (req, res) => {
  res.json({ ok: true, bot: faq.brand, products: faq.products.length });
});

app.post("/webhook", async (req, res) => {
  try {
    const from = extractFrom(req.body);
    const text = extractMessage(req.body);
    const reply = getReply(text);

    if (from) {
      const isOwner = OWNER_NUMBER && from.includes(OWNER_NUMBER);
      if (!isOwner && /order\s+(id|karna)/i.test(text)) {
        // keep simple rule-based flow; owner notification can be added later
      }
      await sendWhatsApp(from, reply);
    }

    res.json({ ok: true, reply });
  } catch (err) {
    console.error("webhook error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post("/api/orders", (req, res) => {
  const { id, items, total, name, mobile, address, pincode, payment } = req.body || {};
  if (!name || !mobile) return res.status(400).json({ ok: false, error: "name & mobile required" });
  const order = {
    id: id || "OS" + String(Date.now()).slice(-6),
    items: items || [],
    total: total || 0,
    name,
    mobile,
    address: address || "",
    pincode: pincode || "",
    payment: payment || "COD",
    placedAt: Date.now(),
    source: "website",
  };
  saveOrder(order);

  if (OWNER_NUMBER) {
    const msg = `🛒 Naya Order!\nID: ${order.id}\nNaam: ${order.name}\nMobile: ${order.mobile}\nTotal: ₹${order.total}\nPayment: ${order.payment}\nAddress: ${order.address} - ${order.pincode}`;
    sendWhatsApp(OWNER_NUMBER, msg);
  }

  res.json({ ok: true, order });
});

app.get("/api/orders", (req, res) => {
  res.json({ ok: true, orders: readOrders() });
});

app.listen(PORT, () => {
  console.log(`Organic Swaad WhatsApp bot running on http://localhost:${PORT}`);
  console.log(`OpenWA: ${OPENWA_BASE_URL} | key set: ${Boolean(OPENWA_API_KEY)}`);
});
