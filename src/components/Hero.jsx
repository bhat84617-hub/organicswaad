import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
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
    <section className="relative pt-[88px] overflow-hidden bg-black">
      {/* Image as <img> so slide height = image height, no cropping (object-contain) */}
      <div className="relative w-full">
        <img
          key={current}
          src={slide.image}
          alt={slide.title}
          className="w-full h-auto block object-contain transition-all duration-700"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content - absolutely centered over image */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-4 sm:py-6 md:py-12">
            <div className="max-w-2xl text-white" key={current}>
              <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-4 uppercase tracking-wider backdrop-blur-sm">
                {slide.subtitle}
              </span>
              <h1 className="font-['Cormorant_Garamond'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-8 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                {slide.desc}
              </p>
              <div className="flex flex-wrap gap-4">
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

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
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
      </div>
    </section>
  );
}