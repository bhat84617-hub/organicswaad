import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const REVIEWS_KEY = "os_reviews";

const testimonials = [
  { name: "Richa Sharma", text: "Organic Swaad ke masale amazing hain! Ab humara monthly masala sirf yahan se aata hai. Quality aur swad dono ekdum best hain.", rating: 5 },
  { name: "Riya Jain", text: "Meri sahel ne mujhe Organic Swaad suggest kiya. Ab mera poora kitchen inke masalon se bhara hai. Fresh aur pure — koi doubt nahi!", rating: 5 },
  { name: "Supriya Agarwal", text: "Bangalore mein rehti hoon, Pahad se masala mangana ab possible hai. Taste bilkul waisa hai jaisa ghar ka bana hota hai.", rating: 5 },
  { name: "Ritesh Verma", text: "10 saal se JMC masale use karte the. Organic Swaad se mila same quality aur better price. Ab sirf yahi se order karte hain.", rating: 5 },
  { name: "Reena Tondon", text: "Gurgaon se order kiya, next day delivery mil gayi. Prices competitive hain aur quality ekdum first class hai.", rating: 5 },
  { name: "Lakshmi Vijaya", text: "Pure aur fresh masale — 5 star! Ab monthly list mein sirf Organic Swaad ka masala aata hai.", rating: 5 },
];

function readUserReviews() {
  try {
    const list = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch (err) {
    return [];
  }
}

function Stars({ n }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, j) => (
        <span key={j} className={`text-sm ${j < n ? "text-yellow-400" : "text-gray-300"}`}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useScrollReveal();
  const [userReviews, setUserReviews] = useState(readUserReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [formMsg, setFormMsg] = useState({ type: "", text: "" });

  const submitReview = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setFormMsg({ type: "error", text: "Apna naam likho." });
      return;
    }
    if (text.trim().length < 10) {
      setFormMsg({ type: "error", text: "Review thoda detail me likho (kam se kam 10 akshar)." });
      return;
    }
    const review = { name: name.trim(), rating, text: text.trim(), at: Date.now() };
    try {
      const list = readUserReviews();
      list.unshift(review);
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(list.slice(0, 50)));
    } catch (err) {}
    setUserReviews(readUserReviews());
    setName("");
    setText("");
    setRating(5);
    setFormMsg({ type: "ok", text: "Dhanyavaad! Aapka review jud gaya." });
  };

  const all = [...userReviews, ...testimonials];

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
          {all.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <Stars n={t.rating || 5} />
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-800 text-sm">{t.name}</span>
                {i < userReviews.length && (
                  <span className="ml-auto text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submitReview} className="max-w-xl mx-auto mt-10 bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-sm">
          <h3 className="font-bold text-gray-900 mb-1">Apna review likho</h3>
          <p className="text-xs text-gray-500 mb-4">Masala kaisa laga? Doosre customers ko batao.</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aapka naam"
            className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 mb-3"
          />
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-xs text-gray-500 mr-1">Rating:</span>
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className={`text-2xl leading-none transition-transform hover:scale-110 ${s <= rating ? "text-yellow-400" : "text-gray-300"}`}
                aria-label={`${s} star`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Apna anubhav likho..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-none mb-3"
          />
          {formMsg.text && (
            <p className={`text-xs mb-3 px-3 py-2 rounded-lg ${formMsg.type === "ok" ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"}`}>
              {formMsg.text}
            </p>
          )}
          <button type="submit" className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-sm font-bold transition-colors">
            Review post karo
          </button>
        </form>
      </div>
    </section>
  );
}