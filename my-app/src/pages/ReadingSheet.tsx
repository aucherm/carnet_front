import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import {
  addReadingSheetWithBook,
  fetchReadingSheetById,
  updateReadingSheet,
  deleteReadingSheet,
} from "../services/readingSheetService";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";

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

export default function ReadingSheet() {
  const { id } = useParams();
  const isEditing = !!id;

  const [form, setForm] = useState(EMPTY);
  const [hovered, setHovered] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => setUserId(data[0].idUser));
  }, []);

  useEffect(() => {
    if (id) {
      fetchReadingSheetById(id).then((sheet) => {
        setForm({
          title: sheet.book.title,
          author: sheet.book.author,
          isbn: sheet.book.isbn,
          cover: sheet.book.cover ?? "",
          status: sheet.status,
          grade: sheet.grade ?? 0,
          review: sheet.review ?? "",
          quote: sheet.quote ?? "",
        });
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing && !userId) return;
    setError(null);
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateReadingSheet(id, { ...form, grade: form.grade || null });
      } else {
        await addReadingSheetWithBook(userId!, {
          ...form,
          grade: form.grade || null,
        });
      }
      navigate("/bookshelf");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Supprimer cette fiche de lecture ?")) return;
    setLoading(true);
    try {
      await deleteReadingSheet(id);
      navigate("/bookshelf");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Logo />
      <div className="flex justify-center items-center py-6">
        <div className="bg-mint rounded-xl border-2 border-gray-800 w-80 shadow-xl overflow-hidden">
          <div className="flex justify-between items-center px-5 pt-5"></div>

          <form onSubmit={handleSubmit} className="px-5 pb-6 mt-4">
         
                     {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Titre du livre *"
              className="w-full text-center font-black font-heading tracking-widest uppercase text-2xl mb-5 "
            />

            <div className="flex gap-3 mb-1">
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    Auteur.ice
                  </label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                    className="bg-white w-full border border-black rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    ISBN
                  </label>
                  <input
                    name="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    className="bg-white w-full border border-black rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-600"
                  />
                </div>
              </div>

              <div className="w-22 h-30 border border-black rounded bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
                {form.cover ? (
                  <img
                    src={form.cover}
                    alt="cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400 text-center px-1">
                    Cover
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs text-gray-600 mb-1 block">Statut</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="bg-white w-full border border-black rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-600"
              >
                <option value="to_read">À lire</option>
                <option value="reading">En cours</option>
                <option value="finished">Terminé</option>
              </select>
            </div>

            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, grade: star }))}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="text-yellow-400 text-xl leading-none"
                >
                  {star <= (hovered || form.grade) ? "★" : "☆"}
                </button>
              ))}
            </div>

            <div className="mb-3">
              <label className="text-xs text-gray-600 mb-1 block">Avis</label>
              <textarea
                name="review"
                value={form.review}
                onChange={handleChange}
                rows={4}
                className="bg-white w-full border border-black rounded px-2 py-1 text-sm resize-none focus:outline-none focus:border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-600 mb-1 block">
                Citation.s
              </label>
              <textarea
                name="quote"
                value={form.quote}
                onChange={handleChange}
                rows={3}
                className="bg-white w-full border border-black rounded px-2 py-1 text-sm resize-none focus:outline-none focus:border-gray-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-white flex-1 border-2 border-gray-800 rounded-full py-2 text-xs font-black uppercase tracking-widest hover:bg-orange transition-colors"
              >
                {loading ? "..." : isEditing ? "Modifier" : "Ajouter"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-white flex-1 border-2 border-green text-green rounded-full py-2 text-xs font-black uppercase tracking-widest hover:bg-orange transition-colors"
                >
                  Supprimer
                </button>
              )}

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => navigate("/bookshelf")}
                  className="bg-white flex-1 border-2 border-gray-800 rounded-full py-2 text-xs font-black uppercase tracking-widest hover:bg-orange transition-colors"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
}
