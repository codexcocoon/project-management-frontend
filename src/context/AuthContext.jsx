import { createContext, useContext, useState, useEffect } from "react";
import { logoutService } from "../services/AuthService";
// 1. create the context
const AuthContext = createContext();
// 2. provide contect wrapper
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );
  // sync changes to localStorage whenever token/user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
  };
  const logout = async (params) => {
    const response = await logoutService(token);
    if (response) {
      setToken(null);
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// 3. Custom hook for easier usage
export function useAuth() {
  return useContext(AuthContext);
}
