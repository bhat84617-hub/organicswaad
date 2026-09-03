import { useCart } from "../context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";

export default function CartSidebar() {
  const { items, updateQty, removeItem, cartTotal, cartCount, open, setOpen } = useCart();

  const whatsappUrl = items.length > 0
    ? `https://wa.me/919759131256?text=${encodeURIComponent(
        `Hi Organic Swaad! 👋\n\nMujhe yeh order karna hai:\n\n${items.map((i) => `• ${i.name} (${i.hindiName}) x ${i.qty} = ₹${i.price * i.qty}`).join("\n")}\n\n*Total: ₹${cartTotal}*\n\nKripya delivery details bhejen. 🙏`
      )}`
    : "#";

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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md shadow-green-200 hover:shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Pe Order — ₹{cartTotal}
            </a>
            <p className="text-[11px] text-gray-400 text-center">COD available · Delivery 3-5 din mein</p>
          </div>
        )}
      </div>
    </>
  );
}