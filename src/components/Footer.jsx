import { Link } from "react-router-dom";
import { siteConfig } from "../data";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Banner */}
      <div className="bg-green-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-2xl mb-2">🌶️</div>
              <h4 className="font-semibold text-sm">Variety</h4>
              <p className="text-xs text-green-200">is the spice of love</p>
            </div>
            <div>
              <div className="text-2xl mb-2">✅</div>
              <h4 className="font-semibold text-sm">Best Quality</h4>
              <p className="text-xs text-green-200">100% Guarantee</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-sm">Huge Savings</h4>
              <p className="text-xs text-green-200">At Lowest Price</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-semibold text-sm">Easy Returns</h4>
              <p className="text-xs text-green-200">No Questions Asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logoimageorganicswaad.jpeg" alt="Organic Swaad" className="h-10 object-contain" />
              <div>
                <span className="font-['Cormorant_Garamond'] text-xl font-bold text-white">Organic Swaad</span>
                <span className="block text-[10px] text-gray-400 tracking-wider uppercase">100% Organic Masala</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm mb-4">
              Organic Swaad is your one-stop online store for 100% organic Indian spices. We deliver the freshest, highest quality organic spices directly to your doorstep. No chemicals, no compromise.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors text-sm">FB</a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors text-sm">IG</a>
              <a href="https://wa.me/919759131256" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors text-sm">WA</a>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Information</h4>
            <nav className="space-y-2.5 text-sm">
              <a href="/" className="block hover:text-green-400 transition-colors">Home</a>
              <Link to="/products" className="block hover:text-green-400 transition-colors">All Products</Link>
              <a href="#why-us" className="block hover:text-green-400 transition-colors">Why Us</a>
              <a href="#testimonials" className="block hover:text-green-400 transition-colors">Reviews</a>
              <a href="#contact" className="block hover:text-green-400 transition-colors">Contact Us</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Organic Swaad Spices, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a href="tel:+919759131256" className="hover:text-green-400 transition-colors">+91-9759131256</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a href="mailto:organicswaad@gmail.com" className="hover:text-green-400 transition-colors">organicswaad@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2024 {siteConfig.brand.name}. All Rights Reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}