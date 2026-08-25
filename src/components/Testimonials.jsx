import useScrollReveal from "../hooks/useScrollReveal";

const testimonials = [
  { name: "Richa Sharma", text: "Organic Swaad ke masale amazing hain! Ab humara monthly masala sirf yahan se aata hai. Quality aur swad dono ekdum best hain." },
  { name: "Riya Jain", text: "Meri sahel ne mujhe Organic Swaad suggest kiya. Ab mera poora kitchen inke masalon se bhara hai. Fresh aur pure — koi doubt nahi!" },
  { name: "Supriya Agarwal", text: "Bangalore mein rehti hoon, Pahad se masala mangana ab possible hai. Taste bilkul waisa hai jaisa ghar ka bana hota hai." },
  { name: "Ritesh Verma", text: "10 saal se JMC masale use karte the. Organic Swaad se mila same quality aur better price. Ab sirf yahi se order karte hain." },
  { name: "Reena Tondon", text: "Gurgaon se order kiya, next day delivery mil gayi. Prices competitive hain aur quality ekdum first class hai." },
  { name: "Lakshmi Vijaya", text: "Pure aur fresh masale — 5 star! Ab monthly list mein sirf Organic Swaad ka masala aata hai." },
];

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-800 text-sm">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}