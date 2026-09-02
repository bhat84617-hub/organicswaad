import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Search,
  User,
  Heart,
  Grid3X3,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const departments = [
  { name: "Powdered Spices", slug: "single-spice", icon: "🌿", sub: ["Haldi Powder", "Mirchi Powder", "Dhaniya Powder", "Jeera Powder"] },
  { name: "Blended Spices", slug: "blend", icon: "🍛", sub: ["Garam Masala", "Kitchen King", "Chaat Masala", "Biryani Masala"] },
  { name: "Whole Spices", slug: "single-spice", icon: "🌰", sub: ["Jeera Whole", "Dhaniya Whole", "Laung", "Elaichi"] },
  { name: "Combo Packs", slug: "combo", icon: "🎁", sub: ["Family Pack", "Starter Pack", "Premium Gift Box"] },
  { name: "Seeds & Herbs", slug: "single-spice", icon: "🌱", sub: ["Flax Seeds", "Sesame", "Herbs"] },
  { name: "Offers", slug: "combo", icon: "🔥", sub: ["30% Off Combos", "Free Delivery"] },
];

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/aa/g, "a")
    .replace(/ee/g, "i")
    .replace(/\s+/g, "");
}

export default function Header() {
  const { cartCount, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [searchCat, setSearchCat] = useState("All Categories");
  const [searchQ, setSearchQ] = useState("");
  const [showSug, setShowSug] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  const filtered = searchQ.trim().length >= 1
    ? products.filter((p) => {
        const q = searchQ.toLowerCase().trim();
        const qNorm = normalize(q);
        const name = p.name.toLowerCase();
        const hindi = (p.hindiName || "").toLowerCase();
        const tag = (p.tagline || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const nameNorm = normalize(p.name);
        const hindiNorm = normalize(p.hindiName || "");
        return (
          name.includes(q) ||
          hindi.includes(q) ||
          tag.includes(q) ||
          cat.includes(q) ||
          nameNorm.includes(qNorm) ||
          hindiNorm.includes(qNorm)
        );
      }).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) && mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setShowSug(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSug(false);
    if (searchQ.trim()) navigate(`/products?search=${encodeURIComponent(searchQ)}`);
    else navigate("/products");
  };

  const onSelect = (slug) => {
    setShowSug(false);
    setSearchQ("");
    navigate(`/product/${slug}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#232323] text-[#a8a8a8] text-[11px] hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Mon - Fri 8:00 am - 6:00 pm
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" /> +91-9759131256
            </span>
            <span className="hidden lg:flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> organicswaad@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Track Order</a>
            <a href="#" className="hover:text-white transition-colors hidden lg:inline">USD / $</a>
            <a href="#" className="hover:text-white transition-colors hidden lg:inline">English</a>
          </div>
        </div>
      </div>



      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-[1440px] mx-auto px-4 h-[72px] flex items-center gap-4">
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <button onClick={() => setMobile(!mobile)} className="lg:hidden p-2 text-white hover:bg-white/10 rounded">
              {mobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="/logoimageorganicswaad.jpeg" alt="Organic Swaad" className="h-10 w-10 object-cover rounded-full border-2 border-white/20" />
              <div className="hidden sm:block">
                <span className="font-['Cormorant_Garamond'] text-xl font-bold text-white leading-tight block">Organic Swaad</span>
                <span className="text-[9px] text-[#a8a8a8] tracking-[0.15em] uppercase">Pure Food. Pure Life.</span>
              </div>
            </Link>
            <div className="relative hidden lg:block">
              <button
                onClick={() => setDeptOpen(!deptOpen)}
                onMouseEnter={() => setDeptOpen(true)}
                className="flex items-center gap-3 bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2.5 rounded text-sm font-medium transition-colors min-w-[200px]"
              >
                <Grid3X3 className="w-4 h-4" /> All Departments
                <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${deptOpen ? "rotate-180" : ""}`} />
              </button>
              {deptOpen && (
                <div onMouseLeave={() => setDeptOpen(false)} className="absolute top-full left-0 w-[280px] bg-white shadow-2xl border border-gray-200 z-50 mt-1">
                  {departments.map((d) => (
                    <Link key={d.name} to={`/products?category=${d.slug}`} onClick={() => setDeptOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 group">
                      <span className="text-xl w-7 text-center">{d.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#16a34a]">{d.name}</div>
                        <div className="text-xs text-gray-400 truncate">{d.sub.slice(0, 2).join(" • ")}</div>
                      </div>
                      <ChevronDown className="w-3 h-3 -rotate-90 text-gray-400" />
                    </Link>
                  ))}
                  <Link to="/products" onClick={() => setDeptOpen(false)} className="block text-center py-3 text-sm font-semibold text-[#16a34a] hover:bg-green-50 border-t border-gray-100">View All Categories →</Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Search with live suggestions */}
          <form onSubmit={handleSearch} ref={searchRef} className="flex-1 max-w-[560px] hidden md:flex items-center mx-4 lg:mx-8 relative">
            <div className="flex w-full h-10 bg-white rounded overflow-hidden">
              <div className="relative hidden lg:flex">
                <select value={searchCat} onChange={(e) => setSearchCat(e.target.value)} className="h-full pl-4 pr-8 text-xs font-medium text-[#555] bg-[#f5f5f5] border-r border-gray-200 outline-none cursor-pointer hover:bg-gray-100">
                  <option>All Categories</option>
                  <option>Powdered Spices</option>
                  <option>Blended Spices</option>
                  <option>Whole Spices</option>
                  <option>Combo Packs</option>
                </select>
                <ChevronDown className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQ}
                onChange={(e) => { setSearchQ(e.target.value); setShowSug(true); }}
                onFocus={() => setShowSug(true)}
                placeholder="Search for masale, combos..."
                className="flex-1 px-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 outline-none"
              />
              <button type="submit" className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 flex items-center justify-center transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
            {/* Live dropdown */}
            {showSug && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                {filtered.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelect(p.slug)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0"
                  >
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-gray-50 rounded border border-gray-100 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#1a1a1a] truncate">{p.name}</div>
                      <div className="text-xs text-gray-400 truncate">{p.hindiName} • {p.category}</div>
                    </div>
                    <div className="text-sm font-bold text-[#16a34a] shrink-0">₹{p.price}</div>
                  </button>
                ))}
                <button onClick={handleSearch} className="w-full py-2.5 text-xs font-semibold text-[#16a34a] hover:bg-green-50 border-t border-gray-100">
                  View all results for "{searchQ}" →
                </button>
              </div>
            )}
            {showSug && searchQ.trim().length >= 1 && filtered.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-sm text-gray-500 z-50">
                No products found for "{searchQ}"
              </div>
            )}
          </form>

          <div className="flex items-center gap-1 md:gap-2 ml-auto">
            <Link to="/products" className="hidden lg:flex flex-col items-center p-2 text-white/80 hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span className="text-[10px] mt-1 leading-none">Account</span>
            </Link>
            <button className="hidden md:flex flex-col items-center p-2 text-white/80 hover:text-white transition-colors relative">
              <Heart className="w-5 h-5" />
              <span className="text-[10px] mt-1 leading-none">Wishlist</span>
              <span className="absolute -top-0.5 right-1 w-4 h-4 bg-[#16a34a] text-white text-[10px] rounded-full flex items-center justify-center font-bold">0</span>
            </button>
            <button onClick={() => setOpen(true)} className="relative flex flex-col items-center p-2 text-white hover:text-white transition-colors">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#16a34a] text-white text-[10px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
              </div>
              <span className="text-[10px] mt-1 leading-none hidden md:block">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile search with live */}
        <form onSubmit={handleSearch} ref={mobileSearchRef} className="md:hidden px-4 pb-3 flex gap-2 relative">
          <input value={searchQ} onChange={(e) => { setSearchQ(e.target.value); setShowSug(true); }} onFocus={() => setShowSug(true)} placeholder="Search masale... (laal type kro)" className="flex-1 h-10 px-4 rounded bg-white text-sm outline-none" />
          <button type="submit" className="w-10 h-10 bg-[#16a34a] rounded flex items-center justify-center text-white shrink-0">
            <Search className="w-4 h-4" />
          </button>
          {showSug && filtered.length > 0 && (
            <div className="absolute top-full left-4 right-4 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
              {filtered.map((p) => (
                <button key={p.id} onClick={() => onSelect(p.slug)} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-gray-50 rounded border flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1a1a1a] truncate">{p.name}</div>
                    <div className="text-xs text-gray-400 truncate">{p.hindiName}</div>
                  </div>
                  <div className="text-sm font-bold text-[#16a34a]">₹{p.price}</div>
                </button>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="bg-white border-b border-gray-200 hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 h-10 flex items-center gap-6 text-xs font-medium text-[#555]">
          <Link to="/" className="hover:text-[#16a34a]">Home</Link>
          <Link to="/products" className="hover:text-[#16a34a]">Shop</Link>
          <a href="#categories" className="hover:text-[#16a34a]">Categories</a>
          <a href="#why-us" className="hover:text-[#16a34a]">Why Us</a>
          <a href="#testimonials" className="hover:text-[#16a34a]">Reviews</a>
          <a href="#contact" className="hover:text-[#16a34a]">Contact</a>
          <span className="ml-auto flex items-center gap-2 text-[#1a1a1a]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Free shipping on orders over ₹999
          </span>
        </div>
      </div>

      {mobile && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">All Departments</div>
              {departments.map((d) => (
                <Link key={d.name} to={`/products?category=${d.slug}`} onClick={() => setMobile(false)} className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg">
                  <span className="text-lg">{d.icon}</span>
                  <span className="text-sm font-medium text-[#1a1a1a]">{d.name}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1">
              <Link to="/" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Home</Link>
              <Link to="/products" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">All Products</Link>
              <a href="#categories" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Categories</a>
              <a
                href="https://wa.me/919759131256?text=Hi%20Organic%20Swaad!"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 px-3 text-sm font-medium bg-[#16a34a] text-white rounded-lg text-center mt-3"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
