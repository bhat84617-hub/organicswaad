import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { signupUser, loginUser, logoutUser, currentUser, saveGoogleSession } from "../store";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [googleBusy, setGoogleBusy] = useState(false);

  useEffect(() => {
    setUser(currentUser());
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
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const u = res.user;
      const profile = {
        name: u.displayName || (u.email ? u.email.split("@")[0] : "User"),
        mobile: u.phoneNumber ? u.phoneNumber.replace(/^\+?91?/, "") : "",
        email: u.email || "",
      };
      saveGoogleSession(profile);
      setUser({ ...profile, provider: "google" });
      return {};
    } catch (err) {
      const code = String(err?.code || "");
      if (code.includes("popup-closed") || code.includes("cancelled-popup")) {
        return { error: "Popup band ho gaya — dobara try karo." };
      }
      if (code.includes("unauthorized-domain")) {
        return { error: "Ye domain Firebase me authorized nahi hai (Authentication → Settings → Authorized domains me add karo)." };
      }
      if (code.includes("account-exists")) {
        return { error: "Is email se account pehle se hai — pehle mobile+password wale sign in se login karo." };
      }
      if (code.includes("popup-blocked")) {
        return { error: "Browser ne popup block kiya — popup allow karke dobara try karo." };
      }
      return { error: "Google login fail ho gaya. Thodi der baad dobara try karo." };
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
    <AuthContext.Provider value={{ user, signup, login, logout, signInWithGoogle, googleBusy }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
