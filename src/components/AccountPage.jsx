import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { processOAuthHash } from "../googleAuth";
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
  const { signup, login, googleSignIn, handleGoogleCredential, googleBusy, redirectError } = useAuth();
  const [mode, setMode] = useState("signin"); // signin | signup
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (redirectError) setError(redirectError);
  }, [redirectError]);

  // Google popup se redirect hokar wapas aaye to hash me id_token hota hai
  useEffect(() => {
    const res = processOAuthHash();
    if (!res) return;
    if (res.error) {
      setError("Google login cancel ho gaya — dobara try karo.");
      return;
    }
    if (res.token && !window.opener) handleGoogleCredential(res.token);
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

      <div className="flex justify-center py-1">
        <button
          type="button"
          onClick={() => { setError(""); googleSignIn(); }}
          disabled={googleBusy}
          className="w-full max-w-sm h-11 px-4 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition-colors disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          Continue with Google
        </button>
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
