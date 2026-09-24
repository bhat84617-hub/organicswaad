import { createContext, useContext, useState, useEffect } from "react";
import { signupUser, loginUser, logoutUser, currentUser } from "../store";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

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

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
