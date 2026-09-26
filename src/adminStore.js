import { products as defaultProducts } from "./data";

const PKEY = "os_products";
const OSTATUS_KEY = "os_order_status";
const PIN_KEY = "os_admin_pin";
const AUTH_KEY = "os_admin_auth";

function read(key, fb) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fb;
  } catch (e) {
    return fb;
  }
}

function write(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// ---------- Products (default data.js, override localStorage me) ----------
export function getProducts() {
  const o = read(PKEY, null);
  return Array.isArray(o) && o.length ? o : defaultProducts;
}

export function productsCustomized() {
  return read(PKEY, null) !== null;
}

export function saveProducts(list) {
  write(PKEY, list);
}

export function resetProducts() {
  localStorage.removeItem(PKEY);
}

export function upsertProduct(p) {
  const list = getProducts().slice();
  const i = list.findIndex((x) => String(x.id) === String(p.id));
  if (i >= 0) list[i] = p;
  else list.unshift(p);
  saveProducts(list);
}

export function deleteProduct(id) {
  saveProducts(getProducts().filter((x) => String(x.id) !== String(id)));
}

export function slugify(name) {
  return String(name || "product")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "product";
}

// ---------- Order status override: { [id]: { index: 0..4 } | { cancelled: true } } ----------
export function getStatusOverride(id) {
  return read(OSTATUS_KEY, {})[id] || null;
}

export function setStatusOverride(id, ov) {
  const m = read(OSTATUS_KEY, {});
  if (!ov) delete m[id];
  else m[id] = ov;
  write(OSTATUS_KEY, m);
}

// ---------- Reviews ----------
export function getReviews() {
  let list = read("os_reviews", []);
  if (!Array.isArray(list)) return [];
  let changed = false;
  list = list.map((r, i) => {
    if (r && !r.id) {
      r = { ...r, id: "r" + (r.at || Date.now()) + "-" + i };
      changed = true;
    }
    return r;
  });
  if (changed) write("os_reviews", list);
  return list;
}

export function deleteReview(id) {
  write(
    "os_reviews",
    getReviews().filter((r) => String(r.id) !== String(id))
  );
}

// ---------- Newsletter ----------
export function getNewsletter() {
  const v = read("os_newsletter", []);
  return Array.isArray(v) ? v : [];
}

export function deleteSubscriber(email) {
  write(
    "os_newsletter",
    getNewsletter().filter((e) => e !== email)
  );
}

// ---------- Contact messages ----------
export function getMessages() {
  const v = read("os_contact_msgs", []);
  return Array.isArray(v) ? v : [];
}

export function deleteMessage(at) {
  write(
    "os_contact_msgs",
    getMessages().filter((m) => m.at !== at)
  );
}

// ---------- Customers (signup users + order wale) ----------
export function getCustomers() {
  const users = read("os_users", []);
  const orders = read("os_orders", []);
  const map = {};
  (Array.isArray(users) ? users : []).forEach((u) => {
    if (!u || !u.mobile) return;
    map[u.mobile] = { name: u.name || "Customer", mobile: u.mobile, source: "signup", orders: 0, spent: 0 };
  });
  (Array.isArray(orders) ? orders : []).forEach((o) => {
    const m = String((o && o.mobile) || "");
    if (!m) return;
    if (!map[m]) map[m] = { name: (o && o.name) || "Customer", mobile: m, source: "order", orders: 0, spent: 0 };
    map[m].orders += 1;
    map[m].spent += Number((o && o.total) || 0);
  });
  return Object.values(map).sort((a, b) => b.spent - a.spent);
}

export function deleteCustomer(mobile) {
  write(
    "os_users",
    read("os_users", []).filter((u) => u.mobile !== mobile)
  );
}

// ---------- Admin PIN (SHA-256 hash, default 1234) ----------
async function sha(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("osadmin:" + str));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPin(pin) {
  const h = await sha(String(pin || ""));
  const saved = localStorage.getItem(PIN_KEY);
  if (!saved) {
    if (h === (await sha("1234"))) return { ok: true, first: true };
    return { ok: false };
  }
  return { ok: h === saved };
}

export async function setPin(pin) {
  localStorage.setItem(PIN_KEY, await sha(String(pin)));
}

export function adminAuthed() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch (e) {
    return false;
  }
}

export function setAdminAuthed(v) {
  try {
    if (v) sessionStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.removeItem(AUTH_KEY);
  } catch (e) {}
}

// ---------- Dashboard stats ----------
export function getStats() {
  const orders = read("os_orders", []);
  const list = Array.isArray(orders) ? orders : [];
  const revenue = list.reduce((s, o) => s + (Number((o && o.total) || 0) || 0), 0);
  const products = getProducts();
  const now = Date.now();
  const day = 864e5;
  const last7 = [6, 5, 4, 3, 2, 1, 0].map((d) => {
    const s = new Date(now - d * day);
    s.setHours(0, 0, 0, 0);
    const e = s.getTime() + day;
    const rev = list
      .filter((o) => o && o.placedAt >= s.getTime() && o.placedAt < e)
      .reduce((x, o) => x + (Number(o.total) || 0), 0);
    return { label: s.toLocaleDateString("en-IN", { weekday: "narrow" }), rev };
  });
  return {
    orders: list.length,
    revenue,
    avgOrder: list.length ? Math.round(revenue / list.length) : 0,
    products: products.length,
    outOfStock: products.filter((p) => !p.inStock).length,
    customers: getCustomers().length,
    reviews: getReviews().length,
    subs: getNewsletter().length,
    msgs: getMessages().length,
    last7,
    recent: list.slice(0, 5),
  };
}

export function exportAll() {
  const data = {
    exportedAt: new Date().toISOString(),
    products: getProducts(),
    orders: read("os_orders", []),
    users: read("os_users", []),
    reviews: getReviews(),
    newsletter: getNewsletter(),
    messages: getMessages(),
    statusOverrides: read(OSTATUS_KEY, {}),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "organicswaad-backup-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
