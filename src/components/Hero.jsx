import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "100% Shuddh Masala",
    subtitle: "Koi Milawat Nahi",
    desc: "Pure Swad ke saath apne khaane mein lao asli Bharatiya swad. Premium quality spices seedha aapke ghar tak.",
    cta: "Abhi Order Karo",
    ctaLink: "/products",
    bg: "from-green-600 to-green-800",
  },
  {
    title: "Fresh Grinding",
    subtitle: "Har Batch Taza",
    desc: "Hamare masale hain taza aur pure. Koi artificial colors ya flavors nahi — sirf asli swad.",
    cta: "Products Dekho",
    ctaLink: "/products",
    bg: "from-emerald-600 to-teal-700",
  },
  {
    title: "Free Delivery",
    subtitle: "Poore India Mein",
    desc: "Cash on Delivery available. Order karo aur ghar baithke paao premium masale.",
    cta: "WhatsApp Pe Order",
    ctaLink: "https://wa.me/919759131256?text=Hi%20Pure%20Swad!",
    bg: "from-green-700 to-green-900",
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
    <section className="relative min-h-[500px] md:min-h-[600px] pt-[104px] overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-all duration-700`}></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex items-center min-h-[400px] md:min-h-[500px]">
        <div className="max-w-2xl text-white" key={current}>
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider backdrop-blur-sm">
            {slide.subtitle}
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {slide.title}
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-lg leading-relaxed">
            {slide.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            {slide.ctaLink.startsWith("http") ? (
              <a
                href={slide.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3.5 rounded-full font-semibold hover:bg-green-50 transition-all shadow-lg"
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <Link
                to={slide.ctaLink}
                className="group inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3.5 rounded-full font-semibold hover:bg-green-50 transition-all shadow-lg"
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}