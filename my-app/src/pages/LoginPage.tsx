// src/pages/LoginPage.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await login(mail, password);
      navigate("/");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Se connecter</button>
    </div>
  );
}