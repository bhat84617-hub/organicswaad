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

// ---------- Auth ----------
export function signupUser({ name, mobile, password }) {
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
  const user = { name: name.trim(), mobile: cleanMobile, password };
  users.push(user);
  write(USERS_KEY, users);
  write(SESSION_KEY, { mobile: cleanMobile });
  return { user: { name: user.name, mobile: user.mobile } };
}

export function loginUser({ mobile, password }) {
  const cleanMobile = String(mobile || "").trim();
  const users = read(USERS_KEY, []);
  const u = users.find((x) => x.mobile === cleanMobile);
  if (!u) return { error: "Account nahi mila. Pehle sign up karo." };
  if (u.password !== password) return { error: "Password galat hai." };
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
