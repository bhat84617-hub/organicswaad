import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products, categories } from "../data";
import ProductCard from "./ProductCard";

function normalize(str) {
  return str.toLowerCase().replace(/aa/g, "a").replace(/ee/g, "i").replace(/\s+/g, "");
}

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  const filtered = useMemo(() => {
    let list = products;
    if (urlCategory) {
      const catMap = { "single-spice": "Single Spice", blend: "Blend", combo: "Combo" };
      const mapped = catMap[urlCategory] || urlCategory;
      list = list.filter((p) => p.category === mapped || p.category.toLowerCase().includes(mapped.toLowerCase()));
    } else if (active !== "All") {
      list = list.filter((p) => p.category === active);
    }
    if (urlSearch.trim()) {
      const q = urlSearch.toLowerCase().trim();
      const qNorm = normalize(q);
      list = list.filter((p) => {
        const name = p.name.toLowerCase();
        const hindi = (p.hindiName || "").toLowerCase();
        const tag = (p.tagline || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        return name.includes(q) || hindi.includes(q) || tag.includes(q) || cat.includes(q) || normalize(p.name).includes(qNorm) || normalize(p.hindiName || "").includes(qNorm);
      });
    }
    return list;
  }, [active, urlSearch, urlCategory]);

  return (
    <section className="py-10 bg-white" id="all-products">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[#16a34a] text-xs font-bold uppercase tracking-widest">New Arrivals</span>
            <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-1">Best Seller’s Trending Product</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#16a34a]">
            View All <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        {/* XStore style tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-3">
          {categories.map((cat) => (
            <button
              key={cat.filter}
              onClick={() => setActive(cat.filter)}
              className={`px-4 py-1.5 text-sm font-medium transition-all border-b-2 -mb-3.5 ${
                active === cat.filter
                  ? "border-[#16a34a] text-[#1a1a1a]"
                  : "border-transparent text-gray-500 hover:text-[#1a1a1a]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid - XStore 5 cols on xl */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* XStore Promo Banners - 3 blocks mid-page */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <Link to="/products" className="relative bg-[#fef3c7] rounded-lg p-6 min-h-[140px] flex flex-col justify-center overflow-hidden group hover:shadow-md transition-shadow">
            <span className="text-xs font-bold tracking-widest text-[#92400e]">30% Off</span>
            <h4 className="font-bold text-[#78350f] text-lg leading-tight mt-1">Contemporary Setting</h4>
            <p className="text-xs text-[#92400e]/70 mt-1">Wooden Material • 2 Year Warranty</p>
            <span className="mt-3 inline-flex w-fit bg-[#1a1a1a] text-white text-xs font-bold px-4 py-1.5 rounded">MAKE DEAL</span>
            <img src="/organicswaadproductmirchipowder.jpeg" alt="" className="absolute right-0 bottom-0 w-28 h-28 object-contain opacity-90 group-hover:scale-105 transition-transform" />
          </Link>
          <Link to="/products?category=combo" className="relative bg-[#16a34a] rounded-lg p-6 min-h-[140px] flex flex-col justify-center overflow-hidden group hover:shadow-md transition-shadow text-white">
            <span className="text-xs font-bold tracking-widest text-white/80">70% Flat</span>
            <h4 className="font-bold text-white text-lg leading-tight mt-1">Wooden Stool</h4>
            <p className="text-xs text-white/70 mt-1">Gift Available • Free Delivery</p>
            <span className="mt-3 inline-flex w-fit bg-white text-[#1a1a1a] text-xs font-bold px-4 py-1.5 rounded">QUICK BUY</span>
          </Link>
          <Link to="/products" className="relative bg-[#f3f4f6] rounded-lg p-6 min-h-[140px] flex flex-col justify-center overflow-hidden group hover:shadow-md transition-shadow">
            <span className="text-xs font-bold tracking-widest text-gray-500">30% Flat</span>
            <h4 className="font-bold text-[#1a1a1a] text-lg leading-tight mt-1">Kabino Sideboard</h4>
            <p className="text-xs text-gray-500 mt-1">3.5-inch (89 mm) • 4 Wide Box</p>
            <span className="mt-3 inline-flex w-fit bg-[#1a1a1a] text-white text-xs font-bold px-4 py-1.5 rounded">VIEW MORE</span>
            <img src="/organicswaadproductimagedhaniyapowder.jpeg" alt="" className="absolute right-0 bottom-0 w-28 h-28 object-contain opacity-90 group-hover:scale-105 transition-transform" />
          </Link>
        </div>

        {urlSearch && (
          <div className="mb-4 text-sm text-gray-500">
            Search results for "<b className="text-[#1a1a1a]">{urlSearch}</b>" — {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Koi product nahi mila {urlSearch ? `"${urlSearch}"` : "is category"} mein.</p>
          </div>
        )}
      </div>
    </section>
  );
}