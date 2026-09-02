import { Link } from "react-router-dom";
import { siteConfig } from "../data";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#a8a8a8]">
      {/* Newsletter - XStore */}
      <div className="border-b border-[#2a2a2a]">
        <div className="max-w-[1440px] mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-white">✉️</div>
            <div>
              <h4 className="text-white text-sm font-bold">Sign up to Newsletter & Follow us</h4>
              <p className="text-xs text-[#a8a8a8]">Get updates by subscribe our weekly newsletter</p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full lg:w-auto max-w-md flex-1 lg:ml-8">
            <input placeholder="Your email address..." className="flex-1 h-10 px-4 bg-white text-sm text-[#1a1a1a] rounded-l outline-none" />
            <button className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 text-xs font-bold tracking-widest rounded-r">SUBSCRIBE</button>
          </form>
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden lg:inline text-[#a8a8a8]">Follow:</span>
            <a href="#" className="w-8 h-8 bg-[#2a2a2a] hover:bg-[#16a34a] rounded-full flex items-center justify-center text-white text-xs transition-colors">FB</a>
            <a href="#" className="w-8 h-8 bg-[#2a2a2a] hover:bg-[#16a34a] rounded-full flex items-center justify-center text-white text-xs transition-colors">IG</a>
            <a href="https://wa.me/919759131256" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#2a2a2a] hover:bg-[#16a34a] rounded-full flex items-center justify-center text-white text-xs transition-colors">WA</a>
          </div>
        </div>
      </div>

      {/* Features Banner - XStore style but with Organic Swaad green */}
      <div className="bg-[#232323] border-b border-[#2a2a2a] py-6">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">🌶️</span>
              <h4 className="font-bold text-xs uppercase tracking-widest">Variety</h4>
              <p className="text-xs text-[#a8a8a8]">is the spice of love</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">✅</span>
              <h4 className="font-bold text-xs uppercase tracking-widest">Best Quality</h4>
              <p className="text-xs text-[#a8a8a8]">100% Guarantee</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">💰</span>
              <h4 className="font-bold text-xs uppercase tracking-widest">Huge Savings</h4>
              <p className="text-xs text-[#a8a8a8]">At Lowest Price</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">🔄</span>
              <h4 className="font-bold text-xs uppercase tracking-widest">Easy Returns</h4>
              <p className="text-xs text-[#a8a8a8]">No Questions Asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand logos - XStore */}
      <div className="border-b border-[#2a2a2a] py-4 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between gap-4 opacity-60">
          <span className="text-xs font-bold tracking-widest text-white">TRUSTED BRANDS:</span>
          <div className="flex gap-6 text-xs font-semibold">
            <span>BUBALUS</span>
            <span>BUSINESS</span>
            <span>CANBERA</span>
            <span>PRESTIGE</span>
            <span>RETROBRAND</span>
            <span>WENTLY</span>
          </div>
        </div>
      </div>

      {/* Main Footer - XStore 4 cols */}
      <div className="max-w-[1440px] mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About - preserve images */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src="/logoimageorganicswaad.jpeg" alt="Organic Swaad" className="h-9 w-9 object-cover rounded-full border border-white/20" />
              <div>
                <span className="font-['Cormorant_Garamond'] text-lg font-bold text-white">Organic Swaad</span>
                <span className="block text-[9px] text-[#a8a8a8] tracking-wider uppercase">100% Organic Masala</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#a8a8a8] mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Organic spices direct to your doorstep.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#16a34a] mt-0.5" />
                <span>East 21st Street / 304 New York NY10010 • Organic Swaad Spices, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#16a34a]" />
                <a href="tel:+919759131256" className="hover:text-white">
                  +91-9759131256
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#16a34a]" />
                <a href="mailto:organicswaad@gmail.com" className="hover:text-white">
                  organicswaad@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Useful Link */}
          <div>
            <h4 className="font-bold text-white text-xs mb-4 uppercase tracking-widest">Useful Link</h4>
            <nav className="space-y-2 text-xs">
              <a href="#" className="block hover:text-white transition-colors">
                Fast Shipping
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Paypal / Secure Payment
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                30 Days Return Policy
              </a>
              <Link to="/products" className="block hover:text-white transition-colors">
                All Products
              </Link>
              <a href="#" className="block hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Returns and Refunds
              </a>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-white text-xs mb-4 uppercase tracking-widest">Customer Service</h4>
            <nav className="space-y-2 text-xs">
              <a href="#why-us" className="block hover:text-white transition-colors">
                Why Us
              </a>
              <a href="#testimonials" className="block hover:text-white transition-colors">
                Reviews
              </a>
              <a href="#contact" className="block hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Track Order
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Business Development
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                30 Days Return
              </a>
            </nav>
          </div>

          {/* Let us help you */}
          <div>
            <h4 className="font-bold text-white text-xs mb-4 uppercase tracking-widest">Let Us Help You</h4>
            <nav className="space-y-2 text-xs">
              <a href="#" className="block hover:text-white transition-colors">
                Fast Shipping
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Paypal / Secure Payment
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                30 Days Return Policy
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Business Development
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Returns and Refunds
              </a>
            </nav>
            <div className="mt-6">
              <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Payment Methods</h5>
              <div className="flex gap-1 flex-wrap opacity-80">
                <span className="bg-white text-[#1a1a1a] text-[9px] font-bold px-2 py-1 rounded">VISA</span>
                <span className="bg-white text-[#1a1a1a] text-[9px] font-bold px-2 py-1 rounded">MC</span>
                <span className="bg-white text-[#1a1a1a] text-[9px] font-bold px-2 py-1 rounded">PAYPAL</span>
                <span className="bg-white text-[#1a1a1a] text-[9px] font-bold px-2 py-1 rounded">UPI</span>
                <span className="bg-white text-[#1a1a1a] text-[9px] font-bold px-2 py-1 rounded">COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - XStore */}
      <div className="border-t border-[#2a2a2a]">
        <div className="max-w-[1440px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#777]">
          <p>Copyright © 2026 XStore theme. Created by 8theme – WooCommerce themes. • © 2024 {siteConfig.brand.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
