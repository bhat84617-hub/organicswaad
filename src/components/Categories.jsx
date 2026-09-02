import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const categories = [
  { name: "Powdered Spices", slug: "single-spice", count: 12, img: "/organicswaadproducthaldipowder.jpeg" },
  { name: "Blended Spices", slug: "blend", count: 8, img: "/organicswaadproductgarammashala.jpeg" },
  { name: "Whole Spices", slug: "single-spice", count: 10, img: "/organicswaadproductjeerapowder.jpeg" },
  { name: "Combo Packs", slug: "combo", count: 6, img: "/organicswaadproductimagedhaniyapowder.jpeg" },
  { name: "Seeds & Herbs", slug: "single-spice", count: 5, img: "/organicswaadproductmirchipowder.jpeg" },
  { name: "Offers", slug: "combo", count: 3, img: "/organicswaadproductgarammashala.jpeg" },
];

export default function Categories() {
  const ref = useScrollReveal();

  return (
    <section id="categories" className="py-10 bg-[#f9f9f9] border-y border-gray-100">
      <div ref={ref} className="reveal max-w-[1440px] mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[#16a34a] text-xs font-bold uppercase tracking-widest">Top Categories</span>
            <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-1">Top Categories Of This Month</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#16a34a]">
            View All <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.slug}`}
              className="group text-center"
            >
              <div className="relative w-full aspect-square max-w-[160px] mx-auto bg-white rounded-full overflow-hidden border border-gray-200 group-hover:border-[#16a34a] group-hover:shadow-lg transition-all duration-300 p-3">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#1a1a1a] group-hover:text-[#16a34a] leading-tight">{cat.name}</h3>
              <p className="text-xs text-gray-400">{cat.count} Products</p>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
}
