import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { signupUser, loginUser, logoutUser, currentUser, saveGoogleSession } from "../store";

const AuthContext = createContext();

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Mobile|Silk/i.test(navigator.userAgent);
}

function mapGoogleError(code) {
  const c = String(code || "");
  if (c.includes("popup-closed") || c.includes("cancelled-popup")) {
    return "Popup band ho gaya — ek baar dobara try karo.";
  }
  if (c.includes("popup-blocked")) {
    return "Browser ne popup block kiya — redirect se login try ho raha hai.";
  }
  if (c.includes("unauthorized-domain")) {
    return "Ye domain Firebase me authorized nahi hai (Authentication → Authorized domains me add karo).";
  }
  if (c.includes("account-exists")) {
    return "Is email se account pehle se hai — pehle mobile+password wale sign in se login karo.";
  }
  if (c.includes("operation-not-allowed")) {
    return "Google sign-in abhi enable nahi hai — Firebase console me Google provider enable karo.";
  }
  if (c.includes("redirect-cancelled") || c.includes("no-auth-event")) {
    return "Login cancel ho gaya — dobara try karo.";
  }
  if (c.includes("internal-error")) {
    return "Google login me dikkat aayi — page refresh karke dobara try karo.";
  }
  return "Google login fail ho gaya. Thodi der baad dobara try karo.";
}

function profileFromFirebase(u) {
  return {
    name: u.displayName || (u.email ? u.email.split("@")[0] : "User"),
    mobile: u.phoneNumber ? u.phoneNumber.replace(/^\+?91?/, "") : "",
    email: u.email || "",
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [redirectError, setRedirectError] = useState("");

  useEffect(() => {
    setUser(currentUser());
    // Redirect flow se wapas aane par yahan result complete hota hai
    getRedirectResult(auth)
      .then((res) => {
        if (res?.user) {
          const profile = profileFromFirebase(res.user);
          saveGoogleSession(profile);
          setUser({ ...profile, provider: "google" });
        }
      })
      .catch((err) => {
        const code = String(err?.code || "");
        if (code && !code.includes("no-auth-event")) {
          console.error("[auth:redirect]", code, err?.message || "");
          setRedirectError(mapGoogleError(code));
        }
      });
  }, []);

  const signup = async (data) => {
    const r = await signupUser(data);
    if (r.user) setUser(r.user);
    return r;
  };

  const login = async (data) => {
    const r = await loginUser(data);
    if (r.user) setUser(r.user);
    return r;
  };

  const signInWithGoogle = async () => {
    setGoogleBusy(true);
    setRedirectError("");
    try {
      // Mobile browsers popup block karte hain — waha redirect flow use karo
      if (isMobileUA()) {
        await signInWithRedirect(auth, googleProvider);
        return {};
      }
      const res = await signInWithPopup(auth, googleProvider);
      const profile = profileFromFirebase(res.user);
      saveGoogleSession(profile);
      setUser({ ...profile, provider: "google" });
      return {};
    } catch (err) {
      const code = String(err?.code || "");
      console.error("[auth]", code, err?.message || "");
      // Popup fail hua to redirect flow se fallback — login phir bhi ho jaye
      if (
        code.includes("popup-blocked") ||
        code.includes("popup-closed") ||
        code.includes("cancelled-popup") ||
        code.includes("blocked-by-popup")
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return {};
        } catch (e2) {
          console.error("[auth:redirect-fallback]", e2?.code || "");
        }
      }
      return { error: mapGoogleError(code) };
    } finally {
      setGoogleBusy(false);
    }
  };

  const logout = () => {
    logoutUser();
    signOut(auth).catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, signInWithGoogle, googleBusy, redirectError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
