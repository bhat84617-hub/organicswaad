import useScrollReveal from "../hooks/useScrollReveal";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const ref = useScrollReveal();

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
            href="https://wa.me/910000000000?text=Hi%20Pure%20Swad!%20Mujhe%20aapke%20masalon%20ke%20baare%20mein%20jaanna%20hai."
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
            href="mailto:pureswad@gmail.com"
            className="group flex items-center gap-4 bg-white px-8 py-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Email</p>
              <p className="text-sm text-gray-400">pureswad@gmail.com</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}