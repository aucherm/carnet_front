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
    <div className="min-h-screen flex items-center justify-center bg-mint px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-sm">

        <div className="flex justify-center gap-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-orange" />
          <span className="w-2 h-2 rounded-full bg-green" />
          <span className="w-2 h-2 rounded-full border border-green" />
        </div>

        <h2 className="font-heading text-5xl font-bold text-grey text-center leading-tight mb-1">
          Inscription
        </h2>
        <p className="text-center text-green text-sm tracking-wide mb-8">✦✦✦</p>

        {error && (
          <p className="bg-orange text-grey text-sm text-center rounded-lg px-3 py-2 mb-5">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">
          {[
            { name: "firstName", label: "Prénom", type: "text" },
            { name: "lastName", label: "Nom", type: "text" },
            { name: "mail", label: "Email", type: "email" },
            { name: "password", label: "Mot de passe", type: "password" },
            { name: "confirmPassword", label: "Confirmer le mot de passe", type: "password" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-green uppercase tracking-widest mb-1.5">
                {label}
              </label>
              <input
                name={name}
                type={type}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border-[1.5px] border-green rounded-xl px-4 py-2.5 text-grey bg-white placeholder:text-green/50 focus:outline-none focus:border-green transition-colors"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-grey text-orange font-heading text-2xl font-bold rounded-xl py-3 tracking-wide hover:bg-green hover:text-white active:scale-[0.98] transition-all"
        >
          {loading ? "Inscription..." : "S'inscrire →"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}
          <NavLink to="/login" className="font-bold text-green underline">
            Se connecter
          </NavLink>
        </p>
      </div>
    </div>
  );
}