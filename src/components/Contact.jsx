import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const MSG_KEY = "os_contact_msgs";

export default function Contact() {
  const ref = useScrollReveal();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [text, setText] = useState("");
  const [formMsg, setFormMsg] = useState({ type: "", text: "" });

  const sendMessage = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setFormMsg({ type: "error", text: "Apna naam likho." });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      setFormMsg({ type: "error", text: "Sahi 10-digit mobile number dalo." });
      return;
    }
    if (text.trim().length < 5) {
      setFormMsg({ type: "error", text: "Apna sandesh likho (kam se kam 5 akshar)." });
      return;
    }
    try {
      const list = JSON.parse(localStorage.getItem(MSG_KEY) || "[]");
      list.unshift({ name: name.trim(), mobile: mobile.trim(), text: text.trim(), at: Date.now() });
      localStorage.setItem(MSG_KEY, JSON.stringify(list));
    } catch (err) {}
    const msg = `Hi Organic Swaad! Main ${name.trim()} (${mobile.trim()}). ${text.trim()}`;
    window.open(`https://wa.me/919355701335?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setName("");
    setMobile("");
    setText("");
    setFormMsg({ type: "ok", text: "Sandesh taiyaar hai — WhatsApp par bhej do, turant jawab milega!" });
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50"></div>

      <div ref={ref} className="reveal max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-green-200">
          Get In Touch
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Sampark <span className="text-green-600">Karein</span>
        </h2>
        <p className="text-gray-500 mb-12 max-w-lg mx-auto">
          Koi bhi sawaal ho, kuch bhi jaanna ho — seedha WhatsApp pe message karein. Turant jawab milega!
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <a
            href="https://wa.me/919355701335?text=Hi%20Organic%20Swaad!%20Mujhe%20aapke%20masalon%20ke%20baare%20mein%20jaanna%20hai."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-white px-8 py-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">WhatsApp</p>
              <p className="text-sm text-gray-400">Seedha message karein</p>
            </div>
          </a>

          <a
            href="tel:+919355701335"
            className="group flex items-center gap-4 bg-white px-8 py-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Call</p>
              <p className="text-sm text-gray-400">+91-9355701335</p>
            </div>
          </a>

          <a
            href="mailto:organicswaad1@gmail.com"
            className="group flex items-center gap-4 bg-white px-8 py-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Email</p>
              <p className="text-sm text-gray-400">organicswaad1@gmail.com</p>
            </div>
          </a>
        </div>

        <form onSubmit={sendMessage} className="max-w-xl mx-auto mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left">
          <h3 className="font-bold text-gray-900 mb-1">Sandesh bhejo</h3>
          <p className="text-xs text-gray-500 mb-4">Form bharo — WhatsApp khulega, bas Send dabana hai.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aapka naam"
              className="h-11 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white"
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              className="h-11 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white"
            />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Apna sawaal ya sandesh likho..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white resize-none mb-3"
          />
          {formMsg.text && (
            <p className={`text-xs mb-3 px-3 py-2 rounded-lg ${formMsg.type === "ok" ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"}`}>
              {formMsg.text}
            </p>
          )}
          <button type="submit" className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-sm font-bold transition-colors">
            WhatsApp par bhejo
          </button>
          <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1.5 justify-center">
            <MapPin className="w-3 h-3" /> Mon–Fri, subah 8 – shaam 6 · turant jawab
          </p>
        </form>
      </div>
    </section>
  );
}