import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const categories = [
  { name: "Powdered Spices", slug: "single-spice", emoji: "🌿", color: "from-amber-50 to-orange-50" },
  { name: "Blended Spices", slug: "blend", emoji: "🍛", color: "from-green-50 to-emerald-50" },
  { name: "Whole Spices", slug: "single-spice", emoji: "🌰", color: "from-yellow-50 to-amber-50" },
  { name: "Combo Packs", slug: "combo", emoji: "🎁", color: "from-red-50 to-pink-50" },
];

export default function Categories() {
  const ref = useScrollReveal();

  return (
    <section id="categories" className="py-16 bg-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">Browse</span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Our Product Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.slug}`}
              className={`group bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cat.emoji}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}