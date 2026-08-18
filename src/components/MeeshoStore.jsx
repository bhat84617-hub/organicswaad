import { Truck, CreditCard, Shield, MessageCircle } from "lucide-react";

export default function MeeshoStore() {
  const whatsappUrl = "https://wa.me/919759131256?text=Hi%20Pure%20Swad!%20Mujhe%20masale%20order%20karne%20hain.%20Kripya%20price%20list%20bhejen.";

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-50 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Seedha Order Karo — Bina App Ke
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Order Karne Ka <span className="text-green-600">Aasan Tarika</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            WhatsApp pe message karo — bas! Humse seedha baat karo, price jaano, aur order confirm karo. 
            Koi app install karne ki zaroorat nahi.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-7 rounded-2xl border border-gray-100 text-center hover:border-green-200 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
              <MessageCircle className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">1. Message Karo</h4>
            <p className="text-sm text-gray-500 leading-relaxed">WhatsApp pe hi batana kaunsa masala chahiye</p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-gray-100 text-center hover:border-green-200 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
              <CreditCard className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">2. Payment Karo</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Cash on Delivery bhi available hai</p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-gray-100 text-center hover:border-green-200 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
              <Truck className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">3. Ghar Pe Paao</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Poore India mein 3-5 din mein delivery</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-green-600 text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Pe Order Karo
          </a>
          <p className="text-xs text-gray-400 mt-3">Bina app ke, seedha WhatsApp se order karo</p>
        </div>
      </div>
    </section>
  );
}