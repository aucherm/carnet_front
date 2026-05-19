// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuth();
  return authenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;