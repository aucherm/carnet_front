// src/pages/LoginPage.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-mint px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-sm">
        {/* Décoration */}
        <div className="flex justify-center gap-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-orange" />
          <span className="w-2 h-2 rounded-full bg-green" />
          <span className="w-2 h-2 rounded-full border border-green" />
        </div>

        <h2 className="font-heading text-5xl font-bold text-grey text-center leading-tight mb-1">
          Connexion
        </h2>
        <p className="text-center text-green text-sm tracking-wide mb-8">✦✦✦</p>

        {error && (
          <p className="bg-orange text-grey text-sm text-center rounded-lg px-3 py-2 mb-5">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-xs font-semibold text-green uppercase tracking-widest mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="vous@exemple.com"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="w-full border-[1.5px] border-mint rounded-xl px-4 py-2.5 text-grey bg-white placeholder:text-green/50 focus:outline-none focus:border-green transition-colors"
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-semibold text-green uppercase tracking-widest mb-1.5">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-[1.5px] border-mint rounded-xl px-4 py-2.5 text-grey bg-white placeholder:text-green/50 focus:outline-none focus:border-green transition-colors"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-grey text-orange font-heading text-2xl font-bold rounded-xl py-3 tracking-wide hover:bg-green hover:text-white active:scale-[0.98] transition-all"
        >
          Se connecter →
        </button>

        {/* Lien vers l'inscription */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{" "}
          <NavLink to="/signup" className="font-bold text-green underline">
            S'inscrire
          </NavLink>
        </p>
      </div>
    </div>
  );
}