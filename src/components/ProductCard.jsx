import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Heart, Minus, Plus, Check, MessageCircle, Star, Eye } from "lucide-react";

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const { toggle, isLiked } = useWishlist();
  const [qty, setQty] = useState(1);
  const liked = isLiked(product.id);

  const inCart = items.some((i) => i.id === product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const saveAmount = product.originalPrice - product.price;

  const whatsappUrl = `https://wa.me/919759131256?text=${encodeURIComponent(
    `Hi Organic Swaad! 👋\n\nMujhe yeh order karna hai:\n\n*${product.name}* (${product.hindiName})\nQuantity: ${qty}\nPrice: ₹${product.price} x ${qty} = ₹${product.price * qty}\nWeight: ${product.weight}\n\nKripya delivery details bhejen. 🙏`
  )}`;

  return (
    <div className="group bg-white border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col">
      {/* Image - XStore style */}
      <Link to={`/product/${product.slug}`} className="block relative">
        <div className="relative aspect-square bg-[#f9f9f9] flex items-center justify-center p-6 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="text-6xl opacity-30">🌿</span>
          )}

          {/* SALE Badge - XStore red */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-[#e53935] text-white text-[10px] font-bold px-2 py-1 leading-none">-{discount}%</div>
          )}

          {/* Wishlist - XStore top right */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product);
            }}
            className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-[#e53935] text-[#e53935]" : "text-gray-400"}`} />
          </button>

          {/* Quick shop eye - XStore center on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white text-[#1a1a1a] text-xs font-semibold px-4 py-1.5 rounded-full shadow flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Quick Shop
            </span>
          </div>
        </div>
      </Link>

      {/* Info - XStore */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Category */}
        <p className="text-[11px] tracking-wide uppercase text-gray-400 font-medium">{product.category || "Spices"}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-[#1a1a1a] text-sm leading-tight mt-0.5 group-hover:text-[#16a34a] transition-colors line-clamp-2 min-h-[36px]">
            {product.name}
          </h3>
        </Link>
        {/* Stars - XStore */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex text-[#ffb800]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#ffb800] text-[#ffb800]" />
            ))}
          </div>
          <span className="text-xs text-gray-400">(24)</span>
        </div>

        {/* Price - XStore */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-[15px] font-bold text-[#1a1a1a]">₹{product.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>

        {/* Weight */}
        <p className="text-xs text-gray-400 mt-1">{product.weight}</p>

        {/* Quantity + Add to Cart - XStore */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="flex items-center border border-gray-200 rounded overflow-hidden h-8">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-full flex items-center justify-center hover:bg-gray-50">
              <Minus className="w-3 h-3 text-gray-500" />
            </button>
            <span className="w-7 h-full flex items-center justify-center text-xs font-medium text-[#1a1a1a] border-x border-gray-100">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-7 h-full flex items-center justify-center hover:bg-gray-50">
              <Plus className="w-3 h-3 text-gray-500" />
            </button>
          </div>
          <button
            onClick={() => addItem(product, qty)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold transition-all h-8 rounded ${
              inCart ? "bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]" : "bg-[#1a1a1a] text-white hover:bg-black"
            }`}
          >
            {inCart ? <Check className="w-3 h-3" /> : <ShoppingCart className="w-3 h-3" />}
            {inCart ? "Added" : "Add to Cart"}
          </button>
        </div>

        {/* WhatsApp - XStore subtle */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 flex items-center justify-center gap-1 w-full py-1.5 rounded text-[11px] font-medium border border-gray-200 text-[#1a1a1a] hover:bg-gray-50 transition-all"
        >
          <MessageCircle className="w-3 h-3" /> WhatsApp
        </a>
      </div>
    </div>
  );
}