import { Link } from "react-router-dom";

function InfoLayout({ title, subtitle, children }) {
  return (
    <section className="pt-[124px] lg:pt-[148px] bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="text-xs font-bold uppercase tracking-wider text-[#16a34a] hover:text-[#15803d]">
          ← Home
        </Link>
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mt-6 space-y-5 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          Koi sawaal ho?{" "}
          <a
            href="https://wa.me/919355701335?text=Hi%20Organic%20Swaad!%20Mujhe%20help%20chahiye."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#16a34a] font-semibold hover:underline"
          >
            WhatsApp par pucho
          </a>{" "}
          ya call karo{" "}
          <a href="tel:+919355701335" className="text-[#16a34a] font-semibold hover:underline">
            +91-9355701335
          </a>
        </div>
      </div>
    </section>
  );
}

function Point({ heading, text }) {
  return (
    <div>
      <h3 className="font-semibold text-[#1a1a1a] mb-1">{heading}</h3>
      <p>{text}</p>
    </div>
  );
}

export function ShippingPage() {
  return (
    <InfoLayout title="Fast Shipping" subtitle="Order se delivery tak — sab kuch saaf-saaf.">
      <Point
        heading="Delivery time"
        text="Order confirm hone ke baad 24–48 hours me dispatch kar dete hain. Aam taur par 3–7 working days me order aapke ghar pahunch jata hai (city ke hisaab se)."
      />
      <Point
        heading="Delivery charges"
        text="₹999 ya usse zyada ke order par delivery bilkul FREE hai. Usse kam ke order par nominal delivery charge lagta hai, jo checkout par dikh jayega."
      />
      <Point
        heading="Cash on Delivery (COD)"
        text="COD available hai — pehle product check karo, phir payment karo. UPI aur online payment ka option bhi hai."
      />
      <Point
        heading="Packing"
        text="Masale airtight hygienic packing me bheje jate hain taaki freshness aur khushboo bani rahe. Transit me damage se bachane ke liye safe packing karte hain."
      />
    </InfoLayout>
  );
}

export function TermsPage() {
  return (
    <InfoLayout title="Terms of Use" subtitle="Website use karne ke simple niyam.">
      <Point
        heading="Products"
        text="Saare products 100% organic masale hain. Photos aur wazan (pack size) product page par clearly mention hai. Natural product hone ki wajah se rang aur khushboo me halka farak ho sakta hai — ye quality ki nishani hai."
      />
      <Point
        heading="Pricing aur payment"
        text="Saari keemtein INR (₹) me hain. Payment UPI, cards ya Cash on Delivery se kar sakte ho. Order confirm hone ke baad price change nahi hota."
      />
      <Point
        heading="Order cancellation"
        text="Dispatch se pehle tak order cancel kar sakte ho — WhatsApp (+91-9355701335) ya call par bas order number bata do. Dispatch ke baad cancellation possible nahi hai."
      />
      <Point
        heading="Misuse"
        text="Website ka galat use (fake orders, spam) karne par order cancel karne ka adhikaar hamare paas surakshit hai."
      />
    </InfoLayout>
  );
}

export function RefundsPage() {
  return (
    <InfoLayout title="Returns and Refunds" subtitle="Seedhi aur imaandaar policy — padh lo, confusion khatam.">
      <Point
        heading="Khula packet return nahi hoga"
        text="Food safety ki wajah se seal khulne / packet open hone ke baad return ya refund possible nahi hai. Isliye order karte waqt pack size dhyaan se chuno."
      />
      <Point
        heading="Galat ya damaged product aaye to?"
        text="Agar galat item aaye, seal-damaged packet mile ya transit me nuksaan ho — to 48 hours ke andar WhatsApp (+91-9355701335) par order number aur photo bhejo. Verification ke baad replacement ya refund milega."
      />
      <Point
        heading="Refund kaise milega"
        text="Approved refund 5–7 working days me wapas ho jata hai — online payment par same source me, COD order par UPI/bank transfer se."
      />
    </InfoLayout>
  );
}

export function TrackOrderPage() {
  return (
    <InfoLayout title="Track Order" subtitle="Apne order ka status 1 minute me jano.">
      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">WhatsApp par track karo (sabse fast)</h3>
        <p>
          Neeche button dabao — WhatsApp khul jayega. Bas apna{" "}
          <b>order number ya mobile number</b> bhej do, hamari team turant status bata degi.
        </p>
        <a
          href="https://wa.me/919355701335?text=Hi%20Organic%20Swaad!%20Mujhe%20apna%20order%20track%20karna%20hai.%20Mera%20order%20number%20hai%3A%20"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-3 bg-[#25D366] hover:bg-[#1eb856] text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors"
        >
          Track on WhatsApp
        </a>
      </div>
      <Point
        heading="Ya call kar lo"
        text="Call karo +91-9355701335 (subah 9 se shaam 8 tak). Order number ready rakho — status turant mil jayega."
      />
      <Point
        heading="Normal timeline"
        text="Dispatch 24–48 hours me, delivery 3–7 working days me. Dispatch ke baad tracking ID WhatsApp/SMS par bhej di jati hai."
      />
    </InfoLayout>
  );
}
