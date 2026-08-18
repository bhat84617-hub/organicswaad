import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Eye, Check, MessageCircle } from "lucide-react";
import { products, categories } from "../data";

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const { addItem, items } = useCart();

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  const getWhatsAppUrl = (product) => {
    const msg = `Hi Pure Swad! 👋\n\nMujhe yeh order karna hai:\n\n*${product.name}* (${product.hindiName})\nPrice: ₹${product.price}\nWeight: ${product.weight}\n\nKripya delivery details bhejen. 🙏`;
    return `https://wa.me/910000000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-green-200">
            Our Collection
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Hamare <span className="text-green-600">Premium Masale</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Har masala — shuddh, taza, aur swadisht. Apna pasandida chunein aur seedha order karein.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.filter}
              onClick={() => setActive(cat.filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                active === cat.filter
                  ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-200"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const inCart = items.some((i) => i.id === product.id);
            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-green-200 hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="relative h-56 bg-gradient-to-br from-gray-50 to-green-50/30 flex items-center justify-center overflow-hidden p-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-6xl opacity-30">🌿</div>
                    )}
                    <div className="absolute top-3 right-3 bg-green-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {discount}% OFF
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-100">
                      {product.weight}
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <div className="mb-3">
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400">{product.hindiName}</p>
                  </div>

                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{product.shortDesc}</p>

                  <div className="flex items-baseline gap-2.5 mb-5">
                    <span className="text-2xl font-bold text-green-700">₹{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="text-xs bg-green-50 text-green-600 font-semibold px-2 py-0.5 rounded-full border border-green-100">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => addItem(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        inCart
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {inCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                      {inCart ? "Added" : "Add to Cart"}
                    </button>

                    <a
                      href={getWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Order
                    </a>

                    <Link
                      to={`/product/${product.slug}`}
                      className="flex items-center justify-center px-3 py-3 rounded-xl border border-gray-200 text-gray-400 hover:border-green-300 hover:text-green-600 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}