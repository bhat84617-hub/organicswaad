import { useState } from "react";
import {
  getProducts,
  productsCustomized,
  upsertProduct,
  deleteProduct,
  resetProducts,
  slugify,
  getCustomers,
  deleteCustomer,
  getReviews,
  deleteReview,
  getNewsletter,
  deleteSubscriber,
  getMessages,
  deleteMessage,
  setPin,
  verifyPin,
  exportAll,
} from "../adminStore";
import { formatDate } from "../store";
import { SectionTitle, Empty, Btn, Field, inputCls, Stars } from "./admin-ui";

const CATS = ["Single Spice", "Blend", "Combo"];

const blankProduct = () => ({
  id: "p" + Date.now(),
  slug: "",
  name: "",
  hindiName: "",
  image: "",
  tagline: "",
  shortDesc: "",
  description: "",
  benefits: [],
  price: "",
  originalPrice: "",
  weight: "200g",
  inStock: true,
  category: "Single Spice",
});

export function ProductsTab({ refreshKey, bump }) {
  const [list, setList] = useState(getProducts);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankProduct());
  const [msg, setMsg] = useState("");

  const reload = () => {
    setList(getProducts());
    bump();
  };

  const startAdd = () => {
    setForm(blankProduct());
    setEditing("new");
    setMsg("");
  };

  const startEdit = (p) => {
    setForm({ ...p, benefits: Array.isArray(p.benefits) ? p.benefits : [] });
    setEditing(p.id);
    setMsg("");
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onImageFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMsg("Product ka naam likho.");
      return;
    }
    const price = Number(form.price);
    if (!price || price <= 0) {
      setMsg("Sahi price dalo.");
      return;
    }
    const mrp = Number(form.originalPrice);
    const slugBase = form.slug.trim() || slugify(form.name);
    let slug = slugBase;
    let n = 2;
    while (list.some((x) => String(x.id) !== String(form.id) && x.slug === slug)) {
      slug = `${slugBase}-${n++}`;
    }
    const p = {
      id: form.id,
      slug,
      name: form.name.trim(),
      hindiName: form.hindiName.trim(),
      image: form.image.trim(),
      tagline: form.tagline.trim(),
      shortDesc: form.shortDesc.trim(),
      description: form.description.trim(),
      benefits: Array.isArray(form.benefits)
        ? form.benefits
        : String(form.benefits || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      price,
      originalPrice: mrp > price ? mrp : price,
      weight: form.weight.trim() || "200g",
      inStock: !!form.inStock,
      category: form.category,
    };
    upsertProduct(p);
    setEditing(null);
    setMsg("");
    reload();
  };

  const del = (id, name) => {
    if (!window.confirm(`"${name}" delete karna hai?`)) return;
    deleteProduct(id);
    reload();
  };

  const toggleStock = (p) => {
    upsertProduct({ ...p, inStock: !p.inStock });
    reload();
  };

  return (
    <div key={refreshKey}>
      <SectionTitle
        title="Products"
        sub={productsCustomized() ? "Tumhare changes live site par dikh rahe hain." : "Abhi default products dikh rahe hain."}
        right={
          <div className="flex gap-2">
            {productsCustomized() && (
              <Btn
                onClick={() => {
                  if (window.confirm("Saare product changes hatakar default wapas laana hai?")) {
                    resetProducts();
                    reload();
                  }
                }}
              >
                Reset Default
              </Btn>
            )}
            <Btn color="green" onClick={startAdd}>+ Add Product</Btn>
          </div>
        }
      />

      {editing && (
        <form onSubmit={save} className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 space-y-4">
          <h3 className="font-bold text-[#1a1a1a]">{editing === "new" ? "Naya Product" : "Product Edit Karo"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Product Name *">
              <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Organic Haldi Powder" className={inputCls} />
            </Field>
            <Field label="Hindi Name">
              <input value={form.hindiName} onChange={(e) => set("hindiName", e.target.value)} placeholder="हल्दी पाउडर" className={inputCls} />
            </Field>
            <Field label="Price (₹) *">
              <input value={form.price} onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))} placeholder="179" inputMode="numeric" className={inputCls} />
            </Field>
            <Field label="MRP (₹) — discount ke liye">
              <input value={form.originalPrice} onChange={(e) => set("originalPrice", e.target.value.replace(/\D/g, ""))} placeholder="249" inputMode="numeric" className={inputCls} />
            </Field>
            <Field label="Category">
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
                {CATS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Weight / Pack Size">
              <input value={form.weight} onChange={(e) => set("weight", e.target.value)} placeholder="200g" className={inputCls} />
            </Field>
            <Field label="Image URL">
              <input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/image.jpeg ya https://..." className={inputCls} />
            </Field>
            <Field label="Ya photo upload karo">
              <input type="file" accept="image/*" onChange={(e) => onImageFile(e.target.files && e.target.files[0])} className="text-xs text-gray-500" />
            </Field>
          </div>
          {form.image && (
            <img src={form.image} alt="preview" className="w-20 h-20 object-contain bg-gray-50 border border-gray-100 rounded-xl" />
          )}
          <Field label="Tagline">
            <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Sona jaise shuddh organic haldi" className={inputCls} />
          </Field>
          <Field label="Short Description">
            <input value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} placeholder="Chhota intro..." className={inputCls} />
          </Field>
          <Field label="Full Description">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Poora detail..." className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100 resize-none" />
          </Field>
          <Field label="Benefits (comma se alag karo)">
            <input
              value={Array.isArray(form.benefits) ? form.benefits.join(", ") : form.benefits}
              onChange={(e) => set("benefits", e.target.value)}
              placeholder="100% chemical-free, Lab tested"
              className={inputCls}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={!!form.inStock} onChange={(e) => set("inStock", e.target.checked)} className="w-4 h-4 accent-[#16a34a]" />
            In Stock (site par dikhega)
          </label>
          {msg && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{msg}</p>}
          <div className="flex gap-2">
            <Btn color="green" type="submit">Save Product</Btn>
            <Btn onClick={() => setEditing(null)}>Cancel</Btn>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-10 h-10 object-contain bg-gray-50 rounded-lg border border-gray-100" />
                      ) : (
                        <span className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">🌿</span>
                      )}
                      <span>
                        <span className="block font-semibold text-[#1a1a1a]">{p.name}</span>
                        <span className="block text-xs text-gray-400">/{p.slug}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.category}</td>
                  <td className="px-4 py-3 font-bold text-[#1a1a1a]">₹{p.price}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStock(p)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                    >
                      {p.inStock ? "In Stock" : "Out"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <Btn onClick={() => startEdit(p)}>Edit</Btn>
                      <Btn color="red" onClick={() => del(p.id, p.name)}>Delete</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function CustomersTab({ refreshKey, bump }) {
  const [list, setList] = useState(getCustomers);
  const [q, setQ] = useState("");

  const reload = () => {
    setList(getCustomers());
    bump();
  };

  const filtered = list.filter((c) => {
    const query = q.trim().toLowerCase();
    return !query || c.name.toLowerCase().includes(query) || c.mobile.includes(query);
  });

  const del = (mobile, name) => {
    if (!window.confirm(`${name} (${mobile}) ko customers se hatana hai?`)) return;
    deleteCustomer(mobile);
    reload();
  };

  return (
    <div key={refreshKey}>
      <SectionTitle
        title="Customers"
        sub={`${filtered.length} customers`}
        right={
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search naam / mobile"
            className="h-9 px-3 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#16a34a] w-44 sm:w-56"
          />
        }
      />
      {filtered.length === 0 ? (
        <Empty text="Koi customer nahi mila." />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[620px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3">Total Spent</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.mobile} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 bg-[#16a34a] text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {(c.name || "C").charAt(0).toUpperCase()}
                        </span>
                        <span>
                          <span className="block font-semibold text-[#1a1a1a]">{c.name}</span>
                          <span className="block text-xs text-gray-400">+91-{c.mobile}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.orders}</td>
                    <td className="px-4 py-3 font-bold text-[#1a1a1a]">₹{c.spent.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-end">
                        <a
                          href={`https://wa.me/91${c.mobile}?text=${encodeURIComponent(`Hi ${c.name}! Organic Swaad se bol rahe hain. 🙏`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          WhatsApp
                        </a>
                        <Btn color="red" onClick={() => del(c.mobile, c.name)}>Delete</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReviewsTab({ refreshKey, bump }) {
  const [list, setList] = useState(getReviews);

  const del = (id, name) => {
    if (!window.confirm(`${name} ka review delete karna hai?`)) return;
    deleteReview(id);
    setList(getReviews());
    bump();
  };

  return (
    <div key={refreshKey}>
      <SectionTitle title="Reviews" sub={`${list.length} customer reviews (site par sabse upar dikhte hain)`} />
      {list.length === 0 ? (
        <Empty text="Abhi koi customer review nahi hai." />
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {list.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <Stars n={r.rating} />
              <p className="text-sm text-gray-600 italic mt-1">"{r.text}"</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-semibold text-gray-700">
                  {r.name} · {r.at ? formatDate(r.at) : ""}
                </span>
                <Btn color="red" onClick={() => del(r.id, r.name)}>Delete</Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function NewsletterTab({ refreshKey, bump }) {
  const [list, setList] = useState(getNewsletter);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(list.join("\n"));
      alert(`${list.length} emails copy ho gaye!`);
    } catch (e) {
      alert("Copy nahi hua — manually select karo.");
    }
  };

  return (
    <div key={refreshKey}>
      <SectionTitle
        title="Newsletter"
        sub={`${list.length} subscribers`}
        right={list.length > 0 && <Btn color="green" onClick={copyAll}>Copy All Emails</Btn>}
      />
      {list.length === 0 ? (
        <Empty text="Koi subscriber nahi hai." />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
          {list.map((e) => (
            <div key={e} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-gray-700">{e}</span>
              <Btn
                color="red"
                onClick={() => {
                  deleteSubscriber(e);
                  setList(getNewsletter());
                  bump();
                }}
              >
                Delete
              </Btn>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MessagesTab({ refreshKey, bump }) {
  const [list, setList] = useState(getMessages);

  return (
    <div key={refreshKey}>
      <SectionTitle title="Messages" sub={`${list.length} contact form messages`} />
      {list.length === 0 ? (
        <Empty text="Koi message nahi hai." />
      ) : (
        <div className="space-y-3">
          {list.map((m) => (
            <div key={m.at} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="font-bold text-[#1a1a1a] text-sm">
                  {m.name} <span className="font-normal text-gray-400">· +91-{m.mobile}</span>
                </span>
                <span className="text-[11px] text-gray-400">{m.at ? formatDate(m.at) : ""}</span>
              </div>
              <p className="text-sm text-gray-600">{m.text}</p>
              <div className="flex gap-2 mt-3">
                <a
                  href={`https://wa.me/91${m.mobile}?text=${encodeURIComponent(`Hi ${m.name}! Organic Swaad se bol rahe hain. Aapke message ("${m.text}") ke jawab me...`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100"
                >
                  Reply on WhatsApp
                </a>
                <Btn
                  color="red"
                  onClick={() => {
                    deleteMessage(m.at);
                    setList(getMessages());
                    bump();
                  }}
                >
                  Delete
                </Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SettingsTab({ bump }) {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const changePin = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    if (!/^\d{4,8}$/.test(newPin)) {
      setMsg({ type: "error", text: "Naya PIN 4–8 digits ka rakho." });
      return;
    }
    if (newPin !== confirmPin) {
      setMsg({ type: "error", text: "Confirm PIN match nahi ho raha." });
      return;
    }
    const r = await verifyPin(oldPin);
    if (!r.ok) {
      setMsg({ type: "error", text: "Purana PIN galat hai." });
      return;
    }
    await setPin(newPin);
    setOldPin("");
    setNewPin("");
    setConfirmPin("");
    setMsg({ type: "ok", text: "PIN badal gaya!" });
    bump();
  };

  return (
    <div className="space-y-5">
      <SectionTitle title="Settings" sub="Admin PIN, backup aur data reset." />

      <form onSubmit={changePin} className="bg-white rounded-2xl border border-gray-100 p-5 max-w-md space-y-4">
        <h3 className="font-bold text-[#1a1a1a] text-sm">Admin PIN Badlo</h3>
        <Field label="Purana PIN">
          <input value={oldPin} onChange={(e) => setOldPin(e.target.value.replace(/\D/g, "").slice(0, 8))} type="password" inputMode="numeric" className={inputCls} />
        </Field>
        <Field label="Naya PIN (4–8 digits)">
          <input value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 8))} type="password" inputMode="numeric" className={inputCls} />
        </Field>
        <Field label="Naya PIN dobara">
          <input value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 8))} type="password" inputMode="numeric" className={inputCls} />
        </Field>
        {msg.text && (
          <p className={`text-xs px-3 py-2 rounded-lg ${msg.type === "ok" ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"}`}>
            {msg.text}
          </p>
        )}
        <Btn color="green" type="submit">PIN Save Karo</Btn>
      </form>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 max-w-md space-y-3">
        <h3 className="font-bold text-[#1a1a1a] text-sm">Backup & Reset</h3>
        <p className="text-xs text-gray-500">Poora data (orders, products, customers, reviews) JSON file me download karo.</p>
        <div className="flex flex-wrap gap-2">
          <Btn color="dark" onClick={exportAll}>Download Backup</Btn>
          <Btn
            onClick={() => {
              if (window.confirm("Products ko default par reset karna hai? Tumhare product changes hat jayenge.")) {
                resetProducts();
                bump();
                alert("Products reset ho gaye.");
              }
            }}
          >
            Reset Products
          </Btn>
        </div>
        <p className="text-[11px] text-gray-400">Note: Ye data isi browser me save hota hai. Doosre phone/computer par admin khologe to wahan ka alag data dikhega.</p>
      </div>
    </div>
  );
}
