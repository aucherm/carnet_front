// src/pages/SignupPage.tsx
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { signup } from "../services/authService";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signup(form.firstName, form.lastName, form.mail, form.password);
      navigate("/login");
    } catch {
      setError("Erreur lors de l'inscription, cet email est peut-être déjà utilisé");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-center font-black tracking-widest uppercase text-5xl mb-8">
          Inscription
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            name="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-5 py-3 text-sm font-semibold outline-none focus:border-green"
          />
          <input
            name="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-5 py-3 text-sm font-semibold outline-none focus:border-green"
          />
          <input
            name="mail"
            type="email"
            placeholder="Email"
            value={form.mail}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-5 py-3 text-sm font-semibold outline-none focus:border-green"
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-5 py-3 text-sm font-semibold outline-none focus:border-green"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-5 py-3 text-sm font-semibold outline-none focus:border-green"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full border-2 border-black rounded-full py-3 text-sm font-bold uppercase tracking-wider bg-orange hover:bg-green transition-colors mt-2"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Déjà un compte ?{" "}
            <NavLink to="/login" className="font-bold underline">
              Se connecter
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}