import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getOrder, orderStatus, formatDate } from "../store";

export function Ph({ children }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-200 rounded px-1.5 py-0.5 whitespace-nowrap">
      {children}
    </span>
  );
}

export function InfoLayout({ title, subtitle, children }) {
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
    <InfoLayout title="Terms of Service" subtitle="Website use karne ke niyam — seedhe shabdon me.">
      <p className="text-xs text-gray-400">
        Effective date: <Ph>["DD Month YYYY" — TO BE ADDED]</Ph> · Last updated: <Ph>["DD Month YYYY" — TO BE ADDED]</Ph>
      </p>

      <Point
        heading="Acceptance"
        text="Is website (www.organicswaad.online) ko use karke aap in Terms se sehmat ho jaate ho. Agar sehmat nahi ho to website use mat karo. Zaruri ho to hum terms badal sakte hai — jaari rakhna nayi terms ka accept hona hai."
      />

      <Point
        heading="Eligibility"
        text="Website account aur order ke liye aapko kam se kam 18 saal ka hona chahiye (ya guardian ki madad se). Galat jaankari de kar account banane ka adhikaar nahi hai."
      />

      <Point
        heading="Account ki zimmedari"
        text="Apna mobile number, password aur login details khud sambhalo. Password ka hash (plain password nahi) browser me save hota hai. Tumhare device se hui kisi bhi activity ki zimmedari tumhari hogi — agar lagta hai koi access kar raha hai to password badlo aur support ko batao."
      />

      <Point
        heading="Products"
        text="Saare products 100% organic masale hain. Photos aur wazan (pack size) product page par clearly mention hai. Natural product hone ki wajah se rang aur khushboo me halka farak ho sakta hai — ye quality ki nishani hai. Stock khatam hone par order cancel karne ka adhikaar humare paas hai (paisa wapas milta hai)."
      />

      <Point
        heading="Pricing aur payment"
        text="Saari keemtein INR (₹) me hain. Payment Cash on Delivery (COD) ya UPI se hota hai — payment ka intezam order confirm karte waqt hota hai. Website par card number/bank details nahi liye jaate. Order confirm hone ke baad price change nahi hota."
      />

      <Point
        heading="Orders aur cancellation"
        text="Order WhatsApp ya call par confirm kiya jata hai. Dispatch se pehle tak order cancel kar sakte ho — WhatsApp (+91-9355701335) ya call par order number bata do. Dispatch ke baad cancellation possible nahi hai. Galat/fake orders, spam ya reselling ke liye order cancel karne ka adhikaar humare paas surakshit hai."
      />

      <Point
        heading="Shipping aur returns"
        text={
          <>
            Delivery ka tareeka aur waqt: <Link to="/shipping" className="text-[#16a34a] font-semibold hover:underline">Shipping Policy</Link> page dekho. Returns, refund aur unki conditions: <Link to="/refunds" className="text-[#16a34a] font-semibold hover:underline">Refund &amp; Cancellation Policy</Link> page dekho. Ye dono in Terms ka hissa hai.
          </>
        }
      />

      <Point
        heading="Intellectual property"
        text="Website ka design, logo, naam 'Organic Swaad', photos, text aur sabhi content humara/humare licensors ka maalik hai. Sirf personal, non-commercial istemal ki ijazat hai — bina likhit ijazat ke copy, redistribute ya resell karna mana hai."
      />

      <Point
        heading="Prohibited use"
        text="Nahi karna: fake/manipulated orders, spam, website ka access automate/scrape karna (scraping), kisi ko nuksaan pahunchana, galat jaankari dena, kanoon todna, ya website ke technical security test karna bina ijazat ke."
      />

      <Point
        heading="Disclaimer"
        text="Website 'jaisa hai' (as-is) di jaati hai — koi guarantee nahi ki kabhi ruke/error aaye. Masale natural food products hain; medical/falahi daave nahi kiye jaate (khaane se judi zaruri baatein product labels par dekho). Jitni kanoon ijazat de, utni hi zimmedari hum leti hai."
      />

      <Point
        heading="Limitation of liability"
        text={
          <>
            Website ya products se judi kisi bhi asal/anshan nuksaan ki soorat me humari zimmedari aapki order value (jo aapne pay ki) tak seemit hogi — jitni kanoon ijazat de. <Ph>[LEGAL REVIEW — clause to be reviewed by lawyer]</Ph>
          </>
        }
      />

      <Point
        heading="Governing law aur changes"
        text={
          <>
            Ye Terms Bharat ke kanoon ke mutabik chalengi; koi vivaad <Ph>["JURISDICTION — sheher/Rajya ke nyayalay TO BE ADDED]</Ph> me hoga. Terms me badlav website par nayi date ke saath dikhega.
          </>
        }
      />

      <Point
        heading="Contact"
        text={
          <>
            In Terms se judi sawaal: <a href="mailto:organicswaad1@gmail.com" className="text-[#16a34a] font-semibold hover:underline">organicswaad1@gmail.com</a> ya WhatsApp/Call <a href="tel:+919355701335" className="text-[#16a34a] font-semibold hover:underline">+91-9355701335</a>. Business name &amp; address: <Ph>["LEGAL BUSINESS NAME AND ADDRESS — TO BE ADDED]</Ph>
          </>
        }
      />
    </InfoLayout>
  );
}

export function RefundsPage() {
  return (
    <InfoLayout title="Refund and Cancellation Policy" subtitle="Seedhi aur imaandaar policy — padh lo, confusion khatam.">
      <p className="text-xs text-gray-400">
        Effective date: <Ph>["DD Month YYYY" — TO BE ADDED]</Ph> · Last updated: <Ph>["DD Month YYYY" — TO BE ADDED]</Ph>
      </p>

      <Point
        heading="Order cancellation"
        text="Dispatch se pehle tak order free cancel ho jata hai — WhatsApp (+91-9355701335) ya call par bas order number bata do. Dispatch ke baad cancellation possible nahi hai (product aapko bheja ja chuka hai)."
      />

      <Point
        heading="Return eligibility"
        text="Return tabhi hoga jab product galat ho, damaged ho ya description se alag ho. Aapke liye zaruri: order number, parcel ka photo (delivery waqt se pehle/andar kholte waqt), aur product ka photo — 48 hours ke andar WhatsApp par bhejo."
      />

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
        text="Approved refund 5–7 working days me wapas ho jata hai — online payment par same source me, COD order par UPI/bank transfer se. Refund ka status hum WhatsApp ya email par batate hai."
      />

      <Point
        heading="Non-refundable cheezein"
        text="Khule/seal-open food items (hygiene), gift/custom orders, aur discount-bought items jinki kharabi ki shikayat verify na ho — ye refund ke liye eligible nahi hain. Ye list zaruri hai kyunki food products return hone par dobara sell nahi kiye ja sakte."
      />

      <Point
        heading="Exchange"
        text="Galat/damaged product ki jagah replacement (same item sahi pack me, ya galat item sahi item se) bhi mil sakta hai — aapko choice hai: refund ya replacement."
      />

      <Point
        heading="Refund nahi mila to?"
        text={
          <>
            Agar 5–7 working days ke baad bhi refund na mile — seedha WhatsApp ya call karo (+91-9355701335), order number ke saath. Escalation: <Ph>["Escalation contact/grievance officer — TO BE ADDED]</Ph>
          </>
        }
      />

      <Point
        heading="Contact"
        text={
          <>
            Refund/cancellation sawaal: <a href="mailto:organicswaad1@gmail.com" className="text-[#16a34a] font-semibold hover:underline">organicswaad1@gmail.com</a> · WhatsApp/Call: <a href="tel:+919355701335" className="text-[#16a34a] font-semibold hover:underline">+91-9355701335</a> · Details: <Link to="/terms" className="text-[#16a34a] font-semibold hover:underline">Terms</Link> | <Link to="/shipping" className="text-[#16a34a] font-semibold hover:underline">Shipping</Link> | <Link to="/privacy-policy" className="text-[#16a34a] font-semibold hover:underline">Privacy Policy</Link>
          </>
        }
      />
    </InfoLayout>
  );
}

export function TrackOrderPage() {
  const [params] = useSearchParams();
  const [orderId, setOrderId] = useState(params.get("orderId") || "");
  const [searched, setSearched] = useState(params.get("orderId") || "");
  const order = searched ? getOrder(searched) : null;
  const status = order ? orderStatus(order) : null;

  const search = (e) => {
    e.preventDefault();
    setSearched(orderId);
  };

  return (
    <InfoLayout title="Track Order" subtitle="Apni Order ID dalo — status yahin dikhega.">
      <form onSubmit={search} className="flex gap-2">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value.toUpperCase())}
          placeholder="Order ID (jaise OS482913)"
          className="flex-1 h-11 px-4 border border-gray-200 rounded-xl text-sm font-bold tracking-wider uppercase outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100"
        />
        <button type="submit" className="px-6 bg-[#1a1a1a] text-white text-sm font-bold rounded-xl hover:bg-black transition-colors">
          Track
        </button>
      </form>

      {searched && !order && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
          "{searched}" ID ka order nahi mila. ID check karo — ye usi phone/browser par dikhega jahan se order kiya tha.
        </p>
      )}

      {order && status && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
            <div>
              <p className="font-bold text-[#1a1a1a]">{order.id}</p>
              <p className="text-xs text-gray-500">
                {formatDate(order.placedAt)} · ₹{order.total} · {order.payment === "COD" ? "Cash on Delivery" : "UPI"}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#16a34a] bg-green-100 px-3 py-1 rounded-full">
              {status.stage}
            </span>
          </div>

          <div className="space-y-0">
            {status.stages.map((s, i) => (
              <div key={s} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i <= status.index ? "bg-[#16a34a] text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i <= status.index ? "✓" : i + 1}
                  </div>
                  {i < status.stages.length - 1 && (
                    <div className={`w-0.5 h-6 ${i < status.index ? "bg-[#16a34a]" : "bg-gray-200"}`} />
                  )}
                </div>
                <p className={`text-sm pb-4 ${i <= status.index ? "font-semibold text-[#1a1a1a]" : "text-gray-400"}`}>
                  {s}
                </p>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
            Delivery address: {order.address}, {order.pincode} · Expected delivery:{" "}
            {formatDate(order.placedAt + 5 * 24 * 3600 * 1000)} tak
          </div>
        </div>
      )}
    </InfoLayout>
  );
}
