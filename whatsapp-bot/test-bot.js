const fs = require("fs");
const path = require("path");

const faq = JSON.parse(fs.readFileSync(path.join(__dirname, "faq.json"), "utf8"));

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

function getReply(text) {
  const t = normalize(text);
  if (!t) return "greeting";
  if (/^(hi|hello|hey|namaste|namaskar)\b/.test(t)) return "greeting";
  if (t.includes("price") || t.includes("rate") || t.includes("kitne")) return "price-list";
  const p = findProduct(t);
  if (p) return `product: ${p.name}`;
  if (t.includes("delivery")) return "delivery-info";
  if (t.includes("payment") || t.includes("cod") || t.includes("upi")) return "payment-info";
  if (t.includes("order")) return "order-help";
  return "fallback";
}

const cases = [
  ["hi", "greeting"],
  ["namaste", "greeting"],
  ["price kya hai", "price-list"],
  ["haldi", "product: Organic Haldi Powder"],
  ["garam masala order karna hai", "product: Organic Garam Masala"],
  ["delivery time", "delivery-info"],
  ["cod available hai?", "payment-info"],
  ["order karna hai", "order-help"],
  ["xyz random", "fallback"],
];

let pass = 0;
for (const [input, expected] of cases) {
  const got = getReply(input);
  const ok = got === expected;
  if (ok) pass++;
  console.log(`${ok ? "PASS" : "FAIL"} | "${input}" -> ${got}${ok ? "" : ` (expected ${expected})`}`);
}

console.log(`\n${pass}/${cases.length} tests passed`);
process.exit(pass === cases.length ? 0 : 1);
