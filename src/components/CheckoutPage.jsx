import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder, getOrder, forwardOrder } from "../store";

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <input
        {...props}
        className="mt-1 w-full h-11 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100"
      />
    </label>
  );
}

export function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("COD");
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <section className="pt-[124px] lg:pt-[148px] bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 font-medium">Cart khali hai — pehle masale add karo.</p>
          <Link to="/products" className="inline-block mt-4 px-6 py-2.5 bg-[#16a34a] text-white text-sm font-bold rounded-xl">
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  const delivery = cartTotal >= 999 ? 0 : 49;
  const grandTotal = cartTotal + delivery;

  const placeOrder = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Apna naam likho.");
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) return setError("Sahi 10-digit mobile number dalo.");
    if (!address.trim()) return setError("Pura delivery address likho.");
    if (!/^\d{6}$/.test(pincode.trim())) return setError("Sahi 6-digit pincode dalo.");
    const order = createOrder({
      items, total: grandTotal, name, mobile, address, pincode, payment,
    });
    forwardOrder(order);
    clearCart();
    navigate(`/order-success/${order.id}`);
  };

  return (
    <section className="pt-[124px] lg:pt-[148px] bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="text-xs font-bold uppercase tracking-wider text-[#16a34a]">
          ← Home
        </Link>
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-6">
          Checkout
        </h1>
        <div className="grid md:grid-cols-[1fr_280px] gap-5">
          <form onSubmit={placeOrder} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <Field label="Naam" value={name} onChange={(e) => setName(e.target.value)} placeholder="Apna naam" />
            <Field
              label="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile"
              inputMode="numeric"
            />
            <label className="block">
              <span className="text-xs font-semibold text-gray-600">Delivery Address</span>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House no, street, area, city"
                rows={3}
                className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100"
              />
            </label>
            <Field
              label="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6-digit pincode"
              inputMode="numeric"
            />
            <div>
              <span className="text-xs font-semibold text-gray-600">Payment</span>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {["COD", "UPI"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPayment(p)}
                    className={`py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                      payment === p
                        ? "bg-green-50 border-[#16a34a] text-[#16a34a]"
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    {p === "COD" ? "Cash on Delivery" : "UPI"}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" className="w-full py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl font-bold transition-colors">
              Order Place Karo — ₹{grandTotal}
            </button>
          </form>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
            <h3 className="font-bold text-[#1a1a1a] text-sm mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-gray-600">
                  <span>{i.name} x {i.qty}</span>
                  <span className="font-semibold text-[#1a1a1a]">₹{i.price * i.qty}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold">{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1a1a1a] text-base">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OrderSuccessPage() {
  const { id } = useParams();
  const order = getOrder(id);

  if (!order) {
    return (
      <section className="pt-[124px] lg:pt-[148px] bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 font-medium">Order nahi mila. ID check karke dobara try karo.</p>
          <Link to="/track-order" className="inline-block mt-4 px-6 py-2.5 bg-[#16a34a] text-white text-sm font-bold rounded-xl">
            Track Order
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[124px] lg:pt-[148px] bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
          ✅
        </div>
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-[#1a1a1a]">
          Order Confirm Ho Gaya!
        </h1>
        <p className="text-sm text-gray-500 mt-2">Shukriya {order.name}! 24–48 hours me dispatch kar denge.</p>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Apki Order ID</p>
          <p className="text-3xl font-bold text-[#16a34a] tracking-wider mt-1">{order.id}</p>
          <p className="text-xs text-gray-400 mt-2">Ye ID note kar lo — isi se order track hoga.</p>
          <p className="text-sm font-bold text-[#1a1a1a] mt-3">
            Total: ₹{order.total} · {order.payment === "COD" ? "Cash on Delivery" : "UPI"}
          </p>
        </div>
        <div className="flex gap-3 justify-center mt-6">
          <Link to={`/track-order?orderId=${order.id}`} className="px-6 py-2.5 bg-[#1a1a1a] text-white text-sm font-bold rounded-xl">
            Track Order
          </Link>
          <Link to="/products" className="px-6 py-2.5 bg-white border border-gray-200 text-sm font-bold rounded-xl">
            Aur Shopping Karo
          </Link>
        </div>
      </div>
    </section>
  );
}
