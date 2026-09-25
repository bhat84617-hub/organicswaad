import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { renderGoogleButton } from "../googleAuth";
import { myOrders, orderStatus, formatDate } from "../store";

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

function AuthForm() {
  const { signup, login, handleGoogleCredential, googleBusy, redirectError } = useAuth();
  const [mode, setMode] = useState("signin"); // signin | signup
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (redirectError) setError(redirectError);
  }, [redirectError]);

  useEffect(() => {
    let alive = true;
    const el = googleBtnRef.current;
    if (!el) return undefined;
    renderGoogleButton(el, handleGoogleCredential, (msg) => {
      if (alive) setError(msg);
    }).catch(() => {
      if (alive) setError("Google login load nahi hua — page refresh karke dobara try karo.");
    });
    return () => {
      alive = false;
    };
  }, [handleGoogleCredential]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = mode === "signup" ? await signup({ name, mobile, password }) : await login({ mobile, password });
      if (r.error) setError(r.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        {["signin", "signup"].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(""); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              mode === m ? "bg-white text-[#1a1a1a] shadow" : "text-gray-500"
            }`}
          >
            {m === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <Field label="Naam" value={name} onChange={(e) => setName(e.target.value)} placeholder="Apna naam" />
        )}
        <Field
          label="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="10-digit mobile number"
          inputMode="numeric"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === "signup" ? "Kam se kam 4 characters" : "Apna password"}
        />
        {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <button
          type="submit"
          disabled={busy || googleBusy}
          className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
        >
          {busy ? "Please ruko..." : mode === "signup" ? "Account Banao" : "Sign In"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">ya</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="flex justify-center py-1" aria-label="Continue with Google">
        <div ref={googleBtnRef} />
      </div>
      {googleBusy && <p className="text-xs text-center text-gray-500 mt-2">Google session save ho rahi hai...</p>}
    </div>
  );
}

function Profile() {
  const { user, logout } = useAuth();
  const orders = myOrders(user.mobile);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-[#16a34a] text-white rounded-full flex items-center justify-center text-xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#1a1a1a]">{user.name}</h3>
          <p className="text-xs text-gray-500">
            {user.mobile ? `+91-${user.mobile}` : user.email}
            {user.provider === "google" && <span className="ml-2 inline-block bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">Google</span>}
          </p>
        </div>
        <button onClick={logout} className="text-xs font-semibold text-red-600 hover:underline">
          Logout
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-[#1a1a1a] mb-4">Mere Orders ({orders.length})</h3>
        {orders.length === 0 ? (
          <p className="text-sm text-gray-500">
            Abhi tak koi order nahi hai.{" "}
            <Link to="/products" className="text-[#16a34a] font-semibold hover:underline">
              Shopping shuru karo →
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => {
              const st = orderStatus(o);
              return (
                <Link
                  key={o.id}
                  to={`/track-order?orderId=${o.id}`}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{o.id}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(o.placedAt)} · ₹{o.total} · {o.items.reduce((a, i) => a + i.qty, 0)} items
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#16a34a] bg-green-100 px-3 py-1 rounded-full">
                    {st.stage}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <section className="pt-[124px] lg:pt-[148px] bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="text-xs font-bold uppercase tracking-wider text-[#16a34a] hover:text-[#15803d]">
          ← Home
        </Link>
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-6">
          {user ? "Mera Account" : "Sign In / Sign Up"}
        </h1>
        {user ? <Profile /> : <AuthForm />}
      </div>
    </section>
  );
}
