import { useState } from "react";
import { Link } from "react-router-dom";
import { products, categories } from "../data";
import ProductCard from "./ProductCard";

export default function ProductsPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section className="py-16 bg-white" id="all-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">Our Collection</span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-gray-900 mt-1">
              All Products
            </h2>
          </div>
          <Link to="/products" className="text-sm text-green-600 hover:text-green-700 font-medium hidden md:block">
            View All →
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.filter}
              onClick={() => setActive(cat.filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                active === cat.filter
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Koi product nahi mila is category mein.</p>
          </div>
        )}
      </div>
    </section>
  );
}