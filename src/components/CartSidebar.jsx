import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const { items, updateQty, removeItem, cartTotal, cartCount, open, setOpen } = useCart();

  const whatsappUrl = `https://wa.me/919355701335?text=${encodeURIComponent(
    `Hi Organic Swaad! 👋\n\nMujhe yeh order karna hai:\n\n${items.map((i) => `• ${i.name} (${i.hindiName}) x ${i.qty} = ₹${i.price * i.qty}`).join("\n")}\n\n*Total: ₹${cartTotal}*\n\nKripya delivery details bhejen. 🙏`
  )}`;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-4.5 h-4.5 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-[15px]">Tumhara Cart</h2>
              <p className="text-xs text-gray-400">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-3" style={{ height: "calc(100vh - 200px)" }}>
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-gray-500 font-medium">Cart khali hai</p>
              <p className="text-gray-400 text-sm mt-1">Masale add karo!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 group">
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl">{item.emoji || "🌿"}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-[11px] text-gray-400">{item.weight}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-gray-500" />
                      </button>
                      <span className="text-sm font-medium w-7 text-center text-gray-900">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                    <span className="font-bold text-green-700 text-sm">₹{item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Total</span>
              <span className="text-2xl font-bold text-green-700">₹{cartTotal}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md shadow-green-200 hover:shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Order Now — ₹{cartTotal}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs text-gray-500 hover:text-[#16a34a] font-medium"
            >
              ya WhatsApp par order karo
            </a>
            <p className="text-[11px] text-gray-400 text-center">COD available · Delivery 3-5 din mein</p>
          </div>
        )}
      </div>
    </>
  );
}