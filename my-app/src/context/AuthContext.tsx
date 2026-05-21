// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { login as loginService, logout as logoutService, isAuthenticated } from "../services/authService";

interface AuthContextType {
  authenticated: boolean;
  login: (mail: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const login = async (mail: string, password: string) => {
    await loginService(mail, password);
    setAuthenticated(true);
  };

  const logout = () => {
    logoutService();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};