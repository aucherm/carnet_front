import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReadingSheetWithBook } from "../services/readingSheetService";

const EMPTY = {
  title: "",
  author: "",
  isbn: "",
  cover: "",
  status: "to_read",
  grade: 0,
  review: "",
  quote: "",
};

export default function AddReadingSheetPage() {
  const [form, setForm] = useState(EMPTY);
  const [hovered, setHovered] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => setUserId(data[0].idUser));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setError(null);
    setLoading(true);
    try {
      await addReadingSheetWithBook(userId, {
        ...form,
        grade: form.grade || null,
      });
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-[#d4ede4] rounded-3xl border-2 border-gray-800 p-6 w-80 shadow-md">

        {/* Titre */}
        <h2 className="text-center font-bold tracking-widest uppercase text-gray-800 mb-5">
          {form.title || "Titre"}
        </h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* Auteur + couverture */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3 flex-1">
              <div>
                <label className="text-sm text-gray-700">Auteur.ice</label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Genre / ISBN</label>
                <input
                  name="isbn"
                  value={form.isbn}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-sm"
                />
              </div>
            </div>

            {/* Couverture */}
            <div className="w-20 h-24 border border-gray-400 rounded bg-white overflow-hidden flex items-center justify-center">
              {form.cover ? (
                <img src={form.cover} alt="cover" className="object-cover w-full h-full" />
              ) : (
                <span className="text-xs text-gray-400 text-center px-1">Cover</span>
              )}
            </div>
          </div>

          {/* Titre caché pour le state */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Titre du livre"
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-sm"
          />

          {/* URL couverture */}
          <input
            name="cover"
            value={form.cover}
            onChange={handleChange}
            placeholder="URL de couverture"
            className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-sm"
          />

          {/* Étoiles */}
          <div className="flex gap-1 justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm((f) => ({ ...f, grade: star }))}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="text-2xl"
              >
                {star <= (hovered || form.grade) ? "★" : "☆"}
              </button>
            ))}
          </div>

          {/* Avis */}
          <div>
            <label className="text-sm text-gray-700">Avis</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-sm resize-none"
            />
          </div>

          {/* Citation */}
          <div>
            <label className="text-sm text-gray-700">Citation.s</label>
            <textarea
              name="quote"
              value={form.quote}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-400 rounded px-2 py-1 bg-white text-sm resize-none"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-white border-2 border-gray-800 rounded-full py-1 text-sm font-bold uppercase tracking-wider hover:bg-gray-100"
            >
              {loading ? "..." : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-white border-2 border-gray-800 rounded-full py-1 text-sm font-bold uppercase tracking-wider hover:bg-gray-100"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}