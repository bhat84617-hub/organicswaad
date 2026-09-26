export function Stat({ label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-[#1a1a1a] mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

export function SectionTitle({ title, sub, right }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h2 className="text-xl font-bold text-[#1a1a1a]">{title}</h2>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Empty({ text }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
      {text}
    </div>
  );
}

export function Btn({ children, onClick, color, type, disabled }) {
  const colors = {
    green: "bg-[#16a34a] hover:bg-[#15803d] text-white",
    dark: "bg-[#1a1a1a] hover:bg-black text-white",
    light: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    red: "bg-red-50 hover:bg-red-100 text-red-600",
  };
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 ${colors[color || "light"]}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

export const inputCls =
  "w-full h-10 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100 bg-white";

export function Stars({ n }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-sm leading-none ${s <= (n || 0) ? "text-yellow-400" : "text-gray-300"}`}>
          ★
        </span>
      ))}
    </span>
  );
}
