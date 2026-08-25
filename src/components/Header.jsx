import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X, ChevronDown, User, Heart, Package } from "lucide-react";

export default function Header() {
  const { cartCount, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [spicesDrop, setSpicesDrop] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-green-700 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>📞 +91-9759131256</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">📧 organicswaad@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-green-200 transition-colors">FB</a>
            <a href="#" className="hover:text-green-200 transition-colors">IG</a>
            <a href="#" className="hover:text-green-200 transition-colors">WA</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative group">
              <button
                onMouseEnter={() => setSpicesDrop(true)}
                onMouseLeave={() => setSpicesDrop(false)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                Spices
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {spicesDrop && (
                <div
                  onMouseEnter={() => setSpicesDrop(true)}
                  onMouseLeave={() => setSpicesDrop(false)}
                  className="absolute top-full left-0 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
                >
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Powdered Spices</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Whole Spices</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Blended Spices</Link>
                  <Link to="/products" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Seeds & Herbs</Link>
                </div>
              )}
            </div>
            <Link to="/products" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              Unique Collection
            </Link>
          </nav>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Organic Swaad" className="h-10 object-contain" />
            <div>
              <span className="font-['Cormorant_Garamond'] text-xl font-bold text-green-700 block leading-tight">Organic Swaad</span>
              <span className="text-[10px] text-gray-400 tracking-wider uppercase">100% Organic Masala</span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Account</span>
            </button>
            <button className="hidden sm:flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Package className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Orders</span>
            </button>
            <button className="hidden sm:flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Wishlist</span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="relative flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobile(!mobile)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobile && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link to="/" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg">Home</Link>
            <Link to="/products" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg">All Products</Link>
            <a href="#categories" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg">Categories</a>
            <a href="#why-us" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg">Why Us</a>
            <a href="#testimonials" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg">Reviews</a>
            <a href="#contact" onClick={() => setMobile(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg">Contact</a>
            <a
              href="https://wa.me/919759131256?text=Hi%20Organic%20Swaad!"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2.5 px-3 text-sm font-medium bg-green-600 text-white rounded-lg text-center mt-3"
            >
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}