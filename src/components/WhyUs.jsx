import useScrollReveal from "../hooks/useScrollReveal";
import { trustCards } from "../data";
import { Check } from "lucide-react";

export default function WhyUs() {
  const ref = useScrollReveal();

  return (
    <section id="why-us" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-40 translate-y-1/2"></div>

      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kyun Chuniye <span className="text-green-600">Pure Swad</span>?
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Hum sirf masala nahi, vishwas bechte hain. Har grain mein hai shuddhata.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl border border-gray-100 text-center hover:border-green-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-green-100 transition-colors text-3xl group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl border border-gray-100 p-8 sm:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["100% Natural Ingredients", "No Artificial Colors", "FSSAI Certified", "Freshly Packed"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}