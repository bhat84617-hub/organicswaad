import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Heart, Minus, Plus, Check, MessageCircle } from "lucide-react";

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const inCart = items.some((i) => i.id === product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const saveAmount = product.originalPrice - product.price;

  const whatsappUrl = `https://wa.me/919759131256?text=${encodeURIComponent(
    `Hi Organic Swaad! 👋\n\nMujhe yeh order karna hai:\n\n*${product.name}* (${product.hindiName})\nQuantity: ${qty}\nPrice: ₹${product.price} x ${qty} = ₹${product.price * qty}\nWeight: ${product.weight}\n\nKripya delivery details bhejen. 🙏`
  )}`;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-green-200 transition-all duration-300">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block relative">
        <div className="relative h-52 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="text-6xl opacity-30">🌿</span>
          )}

          {/* SALE Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded">
              SALE
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-green-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mb-2">{product.hindiName}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-bold text-green-700">Rs.{product.price}</span>
          <span className="text-sm text-gray-400 line-through">Rs.{product.originalPrice}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-green-600 font-medium">Save Rs.{saveAmount}</span>
          <span className="text-xs text-red-500 font-semibold">Discount ({discount}%)</span>
        </div>

        {/* Weight */}
        <p className="text-xs text-gray-500 mb-3">{product.weight}</p>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-3 h-3 text-gray-500" />
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-800 border-x border-gray-100">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-3 h-3 text-gray-500" />
            </button>
          </div>

          <button
            onClick={() => addItem(product, qty)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              inCart
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {inCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            {inCart ? "Added" : "Add to Cart"}
          </button>
        </div>

        {/* WhatsApp Order */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold border border-green-200 text-green-700 hover:bg-green-50 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp Pe Order
        </a>
      </div>
    </div>
  );
}