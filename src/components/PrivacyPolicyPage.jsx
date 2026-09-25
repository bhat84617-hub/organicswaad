import { Link } from "react-router-dom";
import { InfoLayout, Ph } from "./InfoPages";

export default function PrivacyPolicyPage() {
  return (
    <InfoLayout
      title="Privacy Policy"
      subtitle="Aapka data kaise liya, use kiya aur sambhala jata hai — saaf-saaf."
    >
      <p className="text-xs text-gray-400">
        Effective date: <Ph>["DD Month YYYY" — TO BE ADDED]</Ph> · Last updated: <Ph>["DD Month YYYY" — TO BE ADDED]</Ph>
      </p>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">1. Introduction and scope</h3>
        <p>
          Ye Privacy Policy Organic Swaad ("hum", "hamara") ke website{" "}
          <a href="https://www.organicswaad.online" className="text-[#16a34a] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
            https://www.organicswaad.online
          </a>{" "}
          par lagu hoti hai. Ye batati hai ki website istemal karte waqt aapki kaun si jaankari collect hoti hai, uska kya hota hai, aur aapke paas kya vikalp hain. Policy sirf is website par lagu hai — kisi third-party website (jaise WhatsApp ya Google) par nahi, jinki apni privacy policies hoti hain.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">2. Information we collect</h3>
        <p className="mb-2">Hum sirf wo jaankari lete hai jo aap khud dete ho ya jo website chalne ke liye zaroori hoti hai:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Account registration (mobile + password):</b> naam, mobile number, aur password. Password seedha store nahi hota — browser me ek one-way hash (SHA-256) ke roop me save hota hai.
          </li>
          <li>
            <b>Google Sign-In (Firebase Authentication):</b> jab aap "Continue with Google" se login karte ho, Google aapse aapka <b>naam, email address</b> (aur agar Google de to profile photo) share karta hai. Ye jaankari Firebase Authentication ke through humein milti hai.
          </li>
          <li>
            <b>Order details:</b> order karne par — naam, mobile number, delivery address, pincode, order ke items, total, aur payment ka tareeka (COD ya UPI). Ye jaankari order process/track karne ke liye istemal hoti hai.
          </li>
          <li>
            <b>Technical information:</b> website host (Vercel) server ke basic logs process kar sakta hai — jaise IP address, time, aur kaunsi page request hui. Ye site chalane aur suraksha ke liye.
          </li>
          <li>
            <b>Cart aur wishlist:</b> aapke cart/wishlist items aapke browser me save hote hai.
          </li>
        </ul>
        <p className="mt-2 text-gray-500">
          Hum website par <b>card number, bank details ya OTP</b> nahi maangte. Payment COD ya UPI se order confirm karte waqt hota hai.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">3. Account data kahan save hota hai</h3>
        <p>
          Aapka account (naam, mobile, hashed password), cart, wishlist aur orders aapke <b>usi browser/device ke local storage</b> me save hote hai. Matlab ye jaankari aapke device par rehti hai. Agar order notification service enabled ho, to checkout par order details secure server par bhi bheji ja sakti hai taki owner ko order ki suchna mile. <Ph>["Confirm order-processing backend before launch" — TO BE ADDED]</Ph>
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">4. Cookies aur similar technologies</h3>
        <p>
          Hum <b>advertising ya tracking cookies</b> nahi lagate, aur koi third-party ad tracker website par nahi hai. Firebase/Google sign-in session chalane ke liye browser storage (aur zarurat padne par cookies) istemal kar sakte hai. Aap apne browser settings se cookies/storage clear karke sign-in session hata sakte hai. Site ke zaroori cookies <b>strictly necessary</b> hai — inke bina login/checkout kaam nahi karenge.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">5. Jaankari ka istemal (How we use information)</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Account banana, sign-in aur session manage karna</li>
          <li>Cart, wishlist aur orders process karna</li>
          <li>Order delivery aur tracking</li>
          <li>Customer support (WhatsApp/email par sawaalon ke jawaab)</li>
          <li>Fraud, fake orders aur misuse se bachna</li>
          <li>Website ko chalana, sudharna aur surakshit rakhna</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">6. Data sharing aur third parties</h3>
        <p className="mb-2">
          Hum aapki jaankari bechte nahi hai. Ye share hoti hai sirf service dene ke liye:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Google Firebase</b> — authentication (Google Sign-In) chalane ke liye (naam, email, profile info process hoti hai). Jaankari:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#16a34a] font-semibold hover:underline">
              Google Privacy Policy
            </a>
          </li>
          <li>
            <b>Vercel</b> — website hosting (server logs process ho sakte hai)
          </li>
          <li>
            <b>WhatsApp (Meta)</b> — sirf tab, jab aap khud WhatsApp chat button istemal karo. Aapki chat WhatsApp ki policy ke mutabik chalti hai.
          </li>
          <li>
            <b>Kanooni requirement</b> — agar kanoon ya court order se jaankari maangi jaye.
          </li>
        </ul>
        <p className="mt-2">
          Payment website par nahi hota — COD ya UPI ka intezam order confirm karte waqt hota hai, aur usme aap seedha apne payment provider se deal karte ho.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">7. Firebase aur Google Sign-In se judi processing</h3>
        <p>
          "Continue with Google" istemal karne par aap Google ke account se authenticate hote ho. Humein sirf wahi milta hai jo Google share karta hai (naam, email, profile photo). Google sign-in ke dauran Google ki privacy policy lagu hoti hai. Firebase Authentication session manage karta hai — hum aapka Google password kabhi nahi dekhte ya store karte hai.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">8. Data security</h3>
        <p>
          Website HTTPS (TLS) par serve hoti hai, jo data ko internet par transfer ke dauran protect karta hai. Aapka password local storage me hash hoke save hota hai, plain text me nahi. <b>Lekin:</b> koi bhi system100% secure nahi ho sakta. Aapke device par saved local data (account, orders) aapke browser ke control me hota hai — isliye apne device ko secure rakhein aur shared/public device se login ke baad logout zaroor karein.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">9. Data retention</h3>
        <p>
          Browser me saved data (account, cart, orders) tab tak rehta hai jab tak aap use browser se clear na karein ya data delete na ho. Order records delivery, support aur guarantee ke liye rakhe jaate hai. <Ph>["Confirm retention period for order records (e.g., X months/years) — TO BE ADDED]</Ph> Jab kanoon ke mutabik data rakhna zaroori ho, tab tak usse rakha ja sakta hai.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">10. Aapke rights (User rights)</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Access/Correction:</b> apne account data dekhne/sudharne ke liye support se sampark karein — ya seedha browser settings se local data clear karein.
          </li>
          <li>
            <b>Deletion:</b> browser data clear karne se local account/orders hat jaate hai. Server par koi data ho to hataane ka anurodh email kar sakte ho.
          </li>
          <li>
            <b>Google data:</b> Google account se judi jaankari aap{" "}
            <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer" className="text-[#16a34a] font-semibold hover:underline">
              Google Account settings
            </a>{" "}
            se control kar sakte ho.
          </li>
          <li>
            <b>Applicable law:</b> Bharat me lagu data protection laws (jaise DPDP Act, 2023, jahan lagu ho) ke tehat aapke aur rights ho sakte hai. <Ph>["Legal review of rights section — TO BE REVIEWED]</Ph>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">11. Children's privacy</h3>
        <p>
          Ye website18 saal se kam umar ke bachchon ke liye nahi hai. Hum jaan-boojh kar bachchon se jaankari nahi lete. Agar aapko lagta hai ki kisi bachche ne jaankari de di hai, to humein batayein — hum use hata denge.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">12. Policy me changes</h3>
        <p>
          Hum ye policy kabhi bhi update kar sakte hai. Bade badlav par website par nayi "Last updated" date dikhegi. Changes ke baad website istemal karna jaari rakhna = nayi policy accept karna.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-[#1a1a1a] mb-1">13. Contact</h3>
        <p>
          Data se judi koi bhi sawaal/hataane ka anurodh ke liye:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Email: <a href="mailto:organicswaad1@gmail.com" className="text-[#16a34a] font-semibold hover:underline">organicswaad1@gmail.com</a> <Ph>["Confirm support email — TO BE CONFIRMED]</Ph></li>
          <li>WhatsApp/Phone: <a href="https://wa.me/919355701335" target="_blank" rel="noopener noreferrer" className="text-[#16a34a] font-semibold hover:underline">+91-9355701335</a> <Ph>["Confirm contact number — TO BE CONFIRMED]</Ph></li>
          <li>Business name &amp; address: <Ph>["Legal business name and postal address — TO BE ADDED]</Ph></li>
          <li>Grievance Officer: <Ph>["Name &amp; contact of Grievance Officer (if applicable under Indian law) — TO BE ADDED]</Ph></li>
        </ul>
      </div>

      <div className="border-t border-gray-100 pt-4 text-sm">
        <p className="font-semibold text-[#1a1a1a] mb-1">Related policies</p>
        <p className="flex flex-wrap gap-4">
          <Link to="/terms" className="text-[#16a34a] font-semibold hover:underline">Terms of Service</Link>
          <Link to="/refunds" className="text-[#16a34a] font-semibold hover:underline">Refund &amp; Cancellation Policy</Link>
          <Link to="/shipping" className="text-[#16a34a] font-semibold hover:underline">Shipping Policy</Link>
          <Link to="/#contact" className="text-[#16a34a] font-semibold hover:underline">Contact Us</Link>
        </p>
      </div>
    </InfoLayout>
  );
}
