import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { heroSpices } from "../data";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-white pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            100% Shuddh Masala — No Compromise
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight text-balance">
            Shuddh Masala,
            <span className="text-green-600 block mt-1">Shuddh Swad</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
            Pure Swad ke saath apne khaane mein lao asli Bharatiya swad. 
            Koi milawat nahi — sirf shuddh, taza, aur premium masale seedha aapke ghar tak.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2.5 bg-green-600 text-white px-8 py-4 rounded-full font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300"
            >
              Abhi Order Karo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/910000000000?text=Hi%20Pure%20Swad!%20Mujhe%20masale%20ke%20baare%20mein%20jaanna%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-medium hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Pe Order
            </a>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <span className="block text-2xl font-bold text-green-600">5+</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Premium Spices</span>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-green-600">1000+</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Happy Customers</span>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-green-600">0%</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Milawat</span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute w-56 h-56 border border-dashed border-green-200 rounded-full animate-spin-slow"></div>

          <div className="relative grid grid-cols-3 gap-4 sm:gap-5 w-full max-w-md mx-auto">
            {heroSpices.map((spice, i) => {
              const isCenter = i === 4;
              const positions = [
                "col-start-1 row-start-1", // Haldi - top left
                "col-start-3 row-start-1", // Lal Mirch - top right
                "col-start-1 row-start-3", // Dhaniya - bottom left
                "col-start-3 row-start-3", // Jeera - bottom right
                "col-start-2 row-start-2", // Garam Masala - center
              ];
              const anims = ["animate-float", "animate-float-delay", "animate-float-slow", "animate-float", "animate-float-delay"];

              return (
                <Link
                  key={spice.slug}
                  to={`/product/${spice.slug}`}
                  className={`group flex flex-col items-center bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1 ${positions[i]} ${anims[i]} ${
                    isCenter ? "p-4 sm:p-5 z-10 border-green-200 shadow-md" : "p-3 sm:p-4"
                  }`}
                >
                  <div className={`${isCenter ? "w-20 h-20 sm:w-24 sm:h-24" : "w-16 h-16 sm:w-20 sm:h-20"} mb-2 overflow-hidden rounded-xl`}>
                    <img
                      src={spice.image}
                      alt={spice.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className={`font-semibold text-gray-800 group-hover:text-green-600 transition-colors text-center ${isCenter ? "text-xs sm:text-sm" : "text-xs sm:text-sm"}`}>
                    {spice.name}
                  </span>
                  <span className={`text-gray-400 text-center ${isCenter ? "text-[10px] sm:text-xs" : "text-[10px] sm:text-xs"}`}>{spice.hindi}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}