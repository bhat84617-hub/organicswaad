import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: "/herosectionslide1.jpeg", alt: "Organic Swaad - Har Zaike Mein Sehat Aur Swaad" },
  { image: "/herosectionslide2.jpeg", alt: "Organic Swaad - Asli Garam Masala" },
  { image: "/herosectionslide3.jpeg", alt: "Organic Swaad - Shuddh Masale" },
  { image: "/herosectionslide4.jpeg", alt: "Organic Swaad - Pure & Natural" },
  { image: "/herosectionslide5.jpeg", alt: "Organic Swaad - 100% Organic" },
  { image: "/herosectionslide6.png", alt: "Organic Swaad - Asli Jeera" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-[124px] lg:pt-[148px] overflow-hidden bg-[#f5f5f5]">
      <div className="max-w-[1440px] mx-auto px-4 py-4 grid lg:grid-cols-[1fr_320px] gap-4">
        {/* Slider - exact image size 1600x773 = 2.07, no crop, high clarity */}
        <div className="relative w-full aspect-[1600/773] bg-black overflow-hidden rounded lg:rounded-lg">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={s.image}
                alt={s.alt}
                className="w-full h-full object-cover object-center block"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="sync"
                draggable={false}
              />
              {/* Side Shop Now button only - no text overlay */}
              <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center bg-white text-[#1a1a1a] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:bg-[#1a1a1a] hover:text-white transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "bg-white w-7" : "bg-white/50 w-2 hover:bg-white/80"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Banners - keep XStore look */}
        <div className="hidden lg:flex flex-col gap-4">
          <Link to="/products" className="relative flex-1 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-lg overflow-hidden p-6 flex flex-col justify-center min-h-[246px] group">
            <span className="text-xs font-bold tracking-widest text-[#92400e] uppercase">Festival Offer</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#78350f] mt-1">Contemporary Wall</h3>
            <p className="text-sm text-[#92400e] mt-1">Now at ₹60 only</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[#78350f]">SHOP NOW →</span>
            <img src="/herosectionslide1.jpeg" alt="" className="absolute right-2 bottom-2 w-24 h-24 object-cover rounded opacity-40 group-hover:opacity-60 transition-opacity" />
          </Link>
          <Link to="/products?category=combo" className="relative flex-1 bg-[#1a1a1a] rounded-lg overflow-hidden p-6 flex flex-col justify-center min-h-[246px] group text-white">
            <span className="text-xs font-bold tracking-widest text-[#22c55e] uppercase">45% Flat</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold mt-1">Decor Pieces</h3>
            <p className="text-xs text-white/60 mt-1">Ultra HD Light • Platinum</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold">VIEW DETAILS →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
