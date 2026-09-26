import { useState } from "react";
import { Link } from "react-router-dom";
import {
  adminAuthed,
  setAdminAuthed,
  verifyPin,
  getStats,
  getStatusOverride,
  setStatusOverride,
} from "../adminStore";
import { orderStatus, formatDate } from "../store";
import { Stat, SectionTitle, Empty, Btn } from "./admin-ui";
import { ProductsTab, CustomersTab, ReviewsTab, NewsletterTab, MessagesTab, SettingsTab } from "./AdminSections";

const STAGES = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "orders", label: "Orders" },
  { id: "products", label: "Products" },
  { id: "customers", label: "Customers" },
  { id: "reviews", label: "Reviews" },
  { id: "newsletter", label: "Newsletter" },
  { id: "messages", label: "Messages" },
  { id: "settings", label: "Settings" },
];

function LoginGate({ onDone }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const r = await verifyPin(pin);
      if (r.ok) {
        setAdminAuthed(true);
        onDone();
      } else {
        setErr("Galat PIN hai — dobara try karo.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-[120px] pb-16">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8">
        <div className="w-12 h-12 bg-[#16a34a] text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-4">
          OS
        </div>
        <h1 className="text-xl font-bold text-[#1a1a1a]">Admin Panel</h1>
        <p className="text-xs text-gray-500 mt-1 mb-5">Sirf store owner ke liye. PIN dalo.</p>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
          placeholder="PIN"
          type="password"
          inputMode="numeric"
          className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm tracking-[0.4em] text-center font-bold outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100 mb-3"
        />
        {err && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">{err}</p>}
        <button
          type="submit"
          disabled={busy || !pin}
          className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
        >
          {busy ? "Check ho raha hai..." : "Login"}
        </button>
        <p className="text-[11px] text-gray-400 mt-4 text-center">Pehli baar default PIN: 1234 (Settings me badal lena)</p>
        <Link to="/" className="block text-center text-xs text-[#16a34a] font-semibold hover:underline mt-3">
          ← Wapas site par
        </Link>
      </form>
    </section>
  );
}

function Dashboard({ refreshKey }) {
  const s = getStats();
  const max = Math.max(1, ...s.last7.map((d) => d.rev));
  return (
    <div className="space-y-5" key={refreshKey}>
      <SectionTitle title="Dashboard" sub="Store ka poora hisaab ek nazar me." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Total Revenue" value={`₹${s.revenue.toLocaleString("en-IN")}`} sub={`${s.orders} orders`} />
        <Stat label="Orders" value={s.orders} sub={`Avg ₹${s.avgOrder}`} />
        <Stat label="Products" value={s.products} sub={s.outOfStock ? `${s.outOfStock} out of stock` : "Sab in stock"} />
        <Stat label="Customers" value={s.customers} sub="Signup + order wale" />
        <Stat label="Reviews" value={s.reviews} sub="Customers ne likhe" />
        <Stat label="Newsletter" value={s.subs} sub="Subscribers" />
        <Stat label="Messages" value={s.msgs} sub="Contact form se" />
        <Stat label="Out of Stock" value={s.outOfStock} sub="Products" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-[#1a1a1a] text-sm mb-4">Last 7 Days Revenue</h3>
        {s.revenue === 0 ? (
          <p className="text-xs text-gray-400">Abhi koi order nahi hai — pehla order aate hi graph banega.</p>
        ) : (
          <div className="flex items-end gap-2 h-32">
            {s.last7.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500 font-semibold">{d.rev > 0 ? `₹${d.rev}` : ""}</span>
                <div
                  className="w-full bg-[#16a34a] rounded-t-md min-h-[4px]"
                  style={{ height: `${Math.max(4, (d.rev / max) * 90)}px` }}
                  title={`₹${d.rev}`}
                />
                <span className="text-[10px] text-gray-400">{d.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-[#1a1a1a] text-sm mb-3">Recent Orders</h3>
        {s.recent.length === 0 ? (
          <p className="text-xs text-gray-400">Koi order nahi hai.</p>
        ) : (
          <div className="space-y-2">
            {s.recent.map((o) => {
              const st = orderStatus(o);
              return (
                <div key={o.id} className="flex items-center justify-between gap-3 border border-gray-100 rounded-xl px-4 py-2.5 text-sm">
                  <span>
                    <span className="font-bold text-[#1a1a1a]">{o.id}</span>
                    <span className="block text-xs text-gray-500">{o.name} · ₹{o.total}</span>
                  </span>
                  <span className="text-[11px] font-bold text-[#16a34a] bg-green-100 px-3 py-1 rounded-full whitespace-nowrap">
                    {st.stage}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function OrdersTab({ refreshKey, bump }) {
  const [q, setQ] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [openId, setOpenId] = useState(null);

  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem("os_orders") || "[]");
    if (!Array.isArray(orders)) orders = [];
  } catch (e) {
    orders = [];
  }

  const filtered = orders.filter((o) => {
    const st = orderStatus(o);
    const query = q.trim().toLowerCase();
    const matchQ =
      !query ||
      o.id.toLowerCase().includes(query) ||
      (o.name || "").toLowerCase().includes(query) ||
      String(o.mobile || "").includes(query);
    const matchS =
      stageFilter === "all" ||
      (stageFilter === "cancelled" ? st.cancelled : st.stage === stageFilter);
    return matchQ && matchS;
  });

  const setStage = (id, value) => {
    if (value === "auto") setStatusOverride(id, null);
    else if (value === "cancelled") setStatusOverride(id, { cancelled: true });
    else setStatusOverride(id, { index: Number(value) });
    bump();
  };

  const delOrder = (id) => {
    if (!window.confirm(`${id} order delete karna hai? Ye wapas nahi aayega.`)) return;
    const list = orders.filter((o) => o.id !== id);
    localStorage.setItem("os_orders", JSON.stringify(list));
    setStatusOverride(id, null);
    bump();
  };

  return (
    <div key={refreshKey}>
      <SectionTitle
        title="Orders"
        sub={`${filtered.length} orders dikh rahe (${orders.length} total)`}
        right={
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search ID / naam / mobile"
              className="h-9 px-3 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#16a34a] w-44 sm:w-56"
            />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="h-9 px-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#16a34a] bg-white"
            >
              <option value="all">Sab status</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        }
      />
      {filtered.length === 0 ? (
        <Empty text="Koi order nahi mila." />
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => {
            const st = orderStatus(o);
            const ov = getStatusOverride(o.id);
            const open = openId === o.id;
            const cur = st.cancelled ? "cancelled" : ov && typeof ov.index === "number" ? String(ov.index) : "auto";
            return (
              <div key={o.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => setOpenId(open ? null : o.id)} className="text-left flex-1 min-w-[180px]">
                    <span className="font-bold text-[#1a1a1a]">{o.id}</span>
                    <span className="block text-xs text-gray-500">
                      {o.name} · +91-{o.mobile} · ₹{o.total} · {o.payment} · {formatDate(o.placedAt)}
                    </span>
                  </button>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${st.cancelled ? "text-red-600 bg-red-100" : "text-[#16a34a] bg-green-100"}`}>
                    {st.stage}
                  </span>
                  <select
                    value={cur}
                    onChange={(e) => setStage(o.id, e.target.value)}
                    className="h-9 px-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#16a34a] bg-white"
                    title="Status badlo"
                  >
                    <option value="auto">Auto (time)</option>
                    {STAGES.map((s, i) => (
                      <option key={s} value={String(i)}>{s}</option>
                    ))}
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Btn color="red" onClick={() => delOrder(o.id)}>Delete</Btn>
                </div>
                {open && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 space-y-2">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Items</p>
                      {(o.items || []).map((it, i) => (
                        <p key={i} className="text-sm">
                          {it.name} × {it.qty} — ₹{it.price * it.qty}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs">Address: {o.address}, {o.pincode}</p>
                    <div className="flex gap-2 pt-1">
                      <a
                        href={`https://wa.me/91${o.mobile}?text=${encodeURIComponent(`Hi ${o.name}! Organic Swaad se bol rahe hain. Aapke order ${o.id} (${st.stage}) ke baare me baat karni thi.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100"
                      >
                        WhatsApp karo
                      </a>
                      <a href={`tel:+91${o.mobile}`} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200">
                        Call karo
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(adminAuthed());
  const [tab, setTab] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);
  const bump = () => setRefreshKey((k) => k + 1);

  if (!authed) return <LoginGate onDone={() => setAuthed(true)} />;

  return (
    <section className="min-h-screen bg-gray-50 pt-[124px] lg:pt-[148px] pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1a1a1a]">Admin Panel</h1>
            <p className="text-xs text-gray-500">Organic Swaad store management</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
              View Site
            </Link>
            <button
              onClick={() => { setAdminAuthed(false); setAuthed(false); }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                tab === t.id ? "bg-[#1a1a1a] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && <Dashboard refreshKey={refreshKey} />}
        {tab === "orders" && <OrdersTab refreshKey={refreshKey} bump={bump} />}
        {tab === "products" && <ProductsTab refreshKey={refreshKey} bump={bump} />}
        {tab === "customers" && <CustomersTab refreshKey={refreshKey} bump={bump} />}
        {tab === "reviews" && <ReviewsTab refreshKey={refreshKey} bump={bump} />}
        {tab === "newsletter" && <NewsletterTab refreshKey={refreshKey} bump={bump} />}
        {tab === "messages" && <MessagesTab refreshKey={refreshKey} bump={bump} />}
        {tab === "settings" && <SettingsTab bump={bump} />}
      </div>
    </section>
  );
}
