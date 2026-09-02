import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
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
  {
    name: "Powdered Spices",
    slug: "single-spice",
    icon: "🌿",
    sub: ["Haldi Powder", "Mirchi Powder", "Dhaniya Powder", "Jeera Powder"],
  },
  {
    name: "Blended Spices",
    slug: "blend",
    icon: "🍛",
    sub: ["Garam Masala", "Kitchen King", "Chaat Masala", "Biryani Masala"],
  },
  {
    name: "Whole Spices",
    slug: "single-spice",
    icon: "🌰",
    sub: ["Jeera Whole", "Dhaniya Whole", "Laung", "Elaichi"],
  },
  {
    name: "Combo Packs",
    slug: "combo",
    icon: "🎁",
    sub: ["Family Pack", "Starter Pack", "Premium Gift Box"],
  },
  { name: "Seeds & Herbs", slug: "single-spice", icon: "🌱", sub: ["Flax Seeds", "Sesame", "Herbs"] },
  { name: "Offers", slug: "combo", icon: "🔥", sub: ["30% Off Combos", "Free Delivery"] },
];

export default function Header() {
  const { cartCount, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [searchCat, setSearchCat] = useState("All Categories");
  const [searchQ, setSearchQ] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) navigate(`/products?search=${encodeURIComponent(searchQ)}`);
    else navigate("/products");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* TopBar - XStore style: dark with promo */}
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
            <span className="text-white">
              Free 2-days shipping on orders <b className="text-[#22c55e]">$255+</b>
            </span>
            <span className="w-px h-3 bg-[#3a3a3a]" />
            <a href="#" className="hover:text-white transition-colors">
              Track Order
            </a>
            <a href="#" className="hover:text-white transition-colors hidden lg:inline">
              USD / $
            </a>
            <a href="#" className="hover:text-white transition-colors hidden lg:inline">
              English
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter strip - XStore secondary top */}
      <div className="bg-[#f5f5f5] text-[#555] text-xs hidden lg:block border-b border-[#e9e9e9]">
        <div className="max-w-[1440px] mx-auto px-4 h-8 flex items-center justify-center gap-2">
          <span>
            Take <b className="text-[#1a1a1a]">30% off</b> when you spend $150 or more with code{" "}
            <b className="bg-[#1a1a1a] text-white px-2 py-0.5 rounded text-[11px]">XSTORE78</b>
          </span>
          <span className="text-[#999]">•</span>
          <a href="#contact" className="text-[#16a34a] hover:underline font-medium">
            More Details
          </a>
        </div>
      </div>

      {/* Main Dark Header - XStore */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-[1440px] mx-auto px-4 h-[72px] flex items-center gap-4">
          {/* Left: Logo + All Departments */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            {/* Mobile hamburger */}
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

            {/* All Departments - XStore signature mega menu trigger */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setDeptOpen(!deptOpen)}
                onMouseEnter={() => setDeptOpen(true)}
                className="flex items-center gap-3 bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2.5 rounded text-sm font-medium transition-colors min-w-[200px]"
              >
                <Grid3X3 className="w-4 h-4" />
                All Departments
                <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${deptOpen ? "rotate-180" : ""}`} />
              </button>

              {deptOpen && (
                <div
                  onMouseLeave={() => setDeptOpen(false)}
                  className="absolute top-full left-0 w-[280px] bg-white shadow-2xl border border-gray-200 z-50 mt-1"
                >
                  {departments.map((d) => (
                    <Link
                      key={d.name}
                      to={`/products?category=${d.slug}`}
                      onClick={() => setDeptOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 group"
                    >
                      <span className="text-xl w-7 text-center">{d.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#16a34a]">{d.name}</div>
                        <div className="text-xs text-gray-400 truncate">{d.sub.slice(0, 2).join(" • ")}</div>
                      </div>
                      <ChevronDown className="w-3 h-3 -rotate-90 text-gray-400" />
                    </Link>
                  ))}
                  <Link
                    to="/products"
                    onClick={() => setDeptOpen(false)}
                    className="block text-center py-3 text-sm font-semibold text-[#16a34a] hover:bg-green-50 border-t border-gray-100"
                  >
                    View All Categories →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Center: Search - XStore centered search with category select */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[560px] hidden md:flex items-center mx-4 lg:mx-8">
            <div className="flex w-full h-10 bg-white rounded overflow-hidden">
              <div className="relative hidden lg:flex">
                <select
                  value={searchCat}
                  onChange={(e) => setSearchCat(e.target.value)}
                  className="h-full pl-4 pr-8 text-xs font-medium text-[#555] bg-[#f5f5f5] border-r border-gray-200 outline-none cursor-pointer hover:bg-gray-100"
                >
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
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search for masale, combos..."
                className="flex-1 px-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 outline-none"
              />
              <button type="submit" className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 flex items-center justify-center transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right: Account / Wishlist / Cart - XStore style */}
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
            <button
              onClick={() => setOpen(true)}
              className="relative flex flex-col items-center p-2 text-white hover:text-white transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#16a34a] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-none hidden md:block">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3 flex gap-2">
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search masale..."
            className="flex-1 h-10 px-4 rounded bg-white text-sm outline-none"
          />
          <button type="submit" className="w-10 h-10 bg-[#16a34a] rounded flex items-center justify-center text-white">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Secondary nav bar - XStore under header categories quick links */}
      <div className="bg-white border-b border-gray-200 hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 h-10 flex items-center gap-6 text-xs font-medium text-[#555]">
          <Link to="/" className="hover:text-[#16a34a] transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#16a34a] transition-colors">
            Shop
          </Link>
          <a href="#categories" className="hover:text-[#16a34a] transition-colors">
            Categories
          </a>
          <a href="#why-us" className="hover:text-[#16a34a] transition-colors">
            Why Us
          </a>
          <a href="#testimonials" className="hover:text-[#16a34a] transition-colors">
            Reviews
          </a>
          <a href="#contact" className="hover:text-[#16a34a] transition-colors">
            Contact
          </a>
          <span className="ml-auto flex items-center gap-2 text-[#1a1a1a]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Free shipping on orders over ₹999
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobile && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            {/* Mega departments mobile */}
            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">All Departments</div>
              {departments.map((d) => (
                <Link
                  key={d.name}
                  to={`/products?category=${d.slug}`}
                  onClick={() => setMobile(false)}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
                >
                  <span className="text-lg">{d.icon}</span>
                  <span className="text-sm font-medium text-[#1a1a1a]">{d.name}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1">
              <Link to="/" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                Home
              </Link>
              <Link to="/products" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                All Products
              </Link>
              <a href="#categories" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                Categories
              </a>
              <a href="#why-us" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                Why Us
              </a>
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
