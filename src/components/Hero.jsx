import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  // NEW TEST SLIDE - isme already design me text hai isliye overlay text hide kiya hai
  {
    title: "Asli Garam Masala",
    subtitle: "Asli Swaad!",
    desc: "Shuddh, swachh aur behtareen garam masala powder - jo laaye har dish mein laajawaab swaad.",
    cta: "Abhi Order Karo",
    ctaLink: "/products",
    bg: "from-amber-800 to-yellow-900",
    image: "/newslideimage.png",
    hideContent: true,
  },
  {
    title: "100% Organic Masala",
    subtitle: "Koi Chemical Nahi",
    desc: "Organic Swaad ke saath apne khaane mein lao asli Bharatiya swad. 100% organic spices seedha aapke ghar tak.",
    cta: "Abhi Order Karo",
    ctaLink: "/products",
    bg: "from-green-600 to-green-800",
    image: "/organicswaadslide1.jpeg",
  },
  {
    title: "Organic Swaad",
    subtitle: "Pure Taste, Pure Life",
    desc: "Humara mission hai har ghar tak shudh organic masale pahunchna. Bina kisi milawat ke, sirf asli swad.",
    cta: "Hamare Baare Mein",
    ctaLink: "/products",
    bg: "from-emerald-600 to-teal-700",
    image: "/organicswaadslide2.jpeg",
  },
  {
    title: "Complete Spice Collection",
    subtitle: "Saare Masale Ek Jagah",
    desc: "Haldi, lal mirch, dhaniya, jeera, garam masala — sab kuch organic aur ek jagah milega. Combo packs bhi available hain.",
    cta: "Combos Dekho",
    ctaLink: "/products",
    bg: "from-green-700 to-emerald-800",
    image: "/organicswaadslide3.jpeg",
  },
  {
    title: "Har Masala Ki Apni Kahaani",
    subtitle: "Premium Quality Spices",
    desc: "Kisi bhi masale ka selection karo — har ek hai 100% organic, fresh grinding, aur chemical-free. Taste fark dekh lo.",
    cta: "Products Dekho",
    ctaLink: "/products",
    bg: "from-emerald-700 to-green-800",
    image: "/organicswaadslide4.jpeg",
  },
  {
    title: "Special Combo Offers",
    subtitle: "Bachao Aur Khareedo",
    desc: "Combo packs mein khareedoge toh 30% tak bacha sakte ho. Family pack, starter pack, aur premium gift boxes available.",
    cta: "Combo Packs Dekho",
    ctaLink: "/products",
    bg: "from-green-600 to-emerald-700",
    image: "/orgnicswaadslide5.jpeg",
  },
  {
    title: "Organic Khet Se Kitchen Tak",
    subtitle: "Farm Fresh Quality",
    desc: "Hamare masale seedha organic khet se aate hain. Koi middleman nahi, koi chemical nahi — sirf prakritik swad.",
    cta: "Abhi Order Karo",
    ctaLink: "https://wa.me/919759131256?text=Hi%20Organic%20Swaad!",
    bg: "from-green-800 to-emerald-900",
    image: "/organicswaadslide6.jpeg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative pt-[124px] lg:pt-[180px] overflow-hidden bg-[#f5f5f5]">
      {/* XStore layout: slider + 2 side banners */}
      <div className="max-w-[1440px] mx-auto px-4 py-4 grid lg:grid-cols-[1fr_320px] gap-4">
        {/* Slider */}
        <div className="relative w-full aspect-[1672/941] max-h-[520px] bg-black overflow-hidden rounded lg:rounded-lg">
        {/* All slides stacked with opacity fade - no blink, no key remount */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-contain object-center block bg-black"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
            {/* Dark overlay - lighter for new image which already has text */}
            {!s.hideContent && <div className="absolute inset-0 bg-black/40"></div>}
          </div>
        ))}

        {/* Content - only show if not hideContent, no key to prevent blink */}
        {!slide.hideContent && (
          <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-4 sm:py-6 md:py-12">
              <div className="max-w-2xl text-white">
                <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-4 uppercase tracking-wider backdrop-blur-sm">
                  {slide.subtitle}
                </span>
                <h1 className="font-['Cormorant_Garamond'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-8 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap gap-4 pointer-events-auto">
                  {slide.ctaLink.startsWith("http") ? (
                    <a
                      href={slide.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 bg-white text-green-700 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-green-50 transition-all shadow-lg"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      to={slide.ctaLink}
                      className="group inline-flex items-center gap-2 bg-white text-green-700 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-green-50 transition-all shadow-lg"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* For hideContent slide - still show minimal CTA centered bottom if needed - optional */}
        {slide.hideContent && (
          <div className="absolute inset-0 z-20 flex items-end justify-center pb-8 sm:pb-12 pointer-events-none">
            <div className="pointer-events-auto">
              {slide.ctaLink.startsWith("http") ? (
                <a
                  href={slide.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 bg-white text-green-700 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-green-50 transition-all shadow-lg"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to={slide.ctaLink}
                  className="hidden sm:inline-flex items-center gap-2 bg-white text-green-700 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-green-50 transition-all shadow-lg"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "bg-white w-8" : "bg-white/40 w-2.5 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        </div>

        {/* XStore Side Banners - 2 promo blocks */}
        <div className="hidden lg:flex flex-col gap-4">
          <Link to="/products" className="relative flex-1 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-lg overflow-hidden p-6 flex flex-col justify-center min-h-[252px] group">
            <span className="text-xs font-bold tracking-widest text-[#92400e] uppercase">Festival Offer</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#78350f] mt-1">Contemporary Wall</h3>
            <p className="text-sm text-[#92400e] mt-1">Now at ₹60 only</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[#78350f] group-hover:gap-2 transition-all">
              SHOP NOW <ArrowRight className="w-4 h-4" />
            </span>
            <img src="/organicswaadproductgarammashala.jpeg" alt="" className="absolute right-2 bottom-2 w-28 h-28 object-contain opacity-90 group-hover:scale-105 transition-transform" />
          </Link>
          <Link to="/products?category=combo" className="relative flex-1 bg-[#1a1a1a] rounded-lg overflow-hidden p-6 flex flex-col justify-center min-h-[252px] group text-white">
            <span className="text-xs font-bold tracking-widest text-[#22c55e] uppercase">45% Flat</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold mt-1">Decor Pieces</h3>
            <p className="text-xs text-white/60 mt-1">Ultra HD Light • Platinum</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold group-hover:gap-2 transition-all">VIEW DETAILS <ArrowRight className="w-4 h-4" /></span>
            <img src="/organicswaadproducthaldipowder.jpeg" alt="" className="absolute right-2 bottom-2 w-28 h-28 object-contain opacity-80 group-hover:scale-105 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
