import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { signupUser, loginUser, logoutUser, currentUser, saveGoogleSession } from "../store";
import { parseGoogleCredential } from "../googleAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [redirectError, setRedirectError] = useState("");

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

  const handleGoogleCredential = useCallback((credential) => {
    setGoogleBusy(true);
    try {
      const p = parseGoogleCredential(credential);
      const profile = {
        name: p.name || (p.email ? p.email.split("@")[0] : "User"),
        email: p.email || "",
        mobile: "",
      };
      saveGoogleSession(profile);
      setUser({ ...profile, provider: "google" });
      setRedirectError("");
    } catch (e) {
      console.error("[auth:google]", e && e.message);
      setRedirectError("Google login fail ho gaya — dobara try karo.");
    } finally {
      setGoogleBusy(false);
    }
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, handleGoogleCredential, googleBusy, redirectError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
