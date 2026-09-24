// Simple browser-local storage for accounts + orders.
// NOTE: Data isi browser/phone me save hota hai (koi server nahi).
// Real cross-device tracking ke liye baad me backend (Firebase/Supabase) lagega.

const USERS_KEY = "os_users";
const SESSION_KEY = "os_session";
const ORDERS_KEY = "os_orders";

function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Password kabhi plain text me mat rako — SHA-256 hash banake store karo.
async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ---------- Auth ----------
export async function signupUser({ name, mobile, password }) {
  const cleanMobile = String(mobile || "").trim();
  if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
    return { error: "Sahi 10-digit mobile number dalo." };
  }
  if (!name || !name.trim()) return { error: "Apna naam likho." };
  if (!password || password.length < 4) return { error: "Password kam se kam 4 characters ka rakho." };
  const users = read(USERS_KEY, []);
  if (users.find((u) => u.mobile === cleanMobile)) {
    return { error: "Is number se account pehle se hai. Sign in karo." };
  }
  const passwordHash = await hashPassword(password, cleanMobile);
  const user = { name: name.trim(), mobile: cleanMobile, passwordHash };
  users.push(user);
  write(USERS_KEY, users);
  write(SESSION_KEY, { mobile: cleanMobile });
  return { user: { name: user.name, mobile: user.mobile } };
}

export async function loginUser({ mobile, password }) {
  const cleanMobile = String(mobile || "").trim();
  const users = read(USERS_KEY, []);
  const u = users.find((x) => x.mobile === cleanMobile);
  if (!u) return { error: "Account nahi mila. Pehle sign up karo." };
  if (u.passwordHash) {
    const inputHash = await hashPassword(password, cleanMobile);
    if (inputHash !== u.passwordHash) return { error: "Password galat hai." };
  } else if (u.password !== password) {
    return { error: "Password galat hai." };
  } else {
    u.passwordHash = await hashPassword(password, cleanMobile);
    delete u.password;
    write(USERS_KEY, users);
  }
  write(SESSION_KEY, { mobile: u.mobile });
  return { user: { name: u.name, mobile: u.mobile } };
}

export function currentUser() {
  const s = read(SESSION_KEY, null);
  if (!s) return null;
  const users = read(USERS_KEY, []);
  const u = users.find((x) => x.mobile === s.mobile);
  return u ? { name: u.name, mobile: u.mobile } : null;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

// ---------- Orders ----------
export function createOrder({ items, total, name, mobile, address, pincode, payment }) {
  const orders = read(ORDERS_KEY, []);
  const id = "OS" + String(Date.now()).slice(-6);
  const order = {
    id,
    items: items.map((i) => ({ name: i.name, hindiName: i.hindiName, qty: i.qty, price: i.price })),
    total,
    name: name.trim(),
    mobile: String(mobile).trim(),
    address: address.trim(),
    pincode: String(pincode).trim(),
    payment,
    placedAt: Date.now(),
  };
  orders.unshift(order);
  write(ORDERS_KEY, orders);
  return order;
}

export function getOrder(id) {
  const orders = read(ORDERS_KEY, []);
  return orders.find((o) => o.id.toUpperCase() === String(id || "").trim().toUpperCase()) || null;
}

// Order ko WhatsApp bot server par bhejo (owner ko notification chalega).
// Fire-and-forget: agar bot down hai ya URL set nahi hai, checkout fail nahi hoga.
export async function forwardOrder(order) {
  const base =
    import.meta.env.VITE_BOT_API_URL ||
    (import.meta.env.DEV ? "http://localhost:3001" : "");
  if (!base) return { skipped: true };
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const res = await fetch(`${base.replace(/\/+$/, "")}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: order.id,
        items: order.items,
        total: order.total,
        name: order.name,
        mobile: order.mobile,
        address: order.address,
        pincode: order.pincode,
        payment: order.payment,
      }),
      signal: ctl.signal,
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

export function myOrders(mobile) {
  const orders = read(ORDERS_KEY, []);
  return orders.filter((o) => o.mobile === mobile);
}

const STAGES = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export function orderStatus(order) {
  const hrs = (Date.now() - order.placedAt) / 36e5;
  let index = 0;
  if (hrs >= 120) index = 4;
  else if (hrs >= 72) index = 3;
  else if (hrs >= 24) index = 2;
  else if (hrs >= 2) index = 1;
  return { stage: STAGES[index], index, stages: STAGES };
}

export function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
