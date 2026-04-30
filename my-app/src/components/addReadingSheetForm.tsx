import { useState } from "react";
import type { ReadingSheet } from "../types/ReadingSheet";
import { addReadingSheetWithBook } from "../services/readingSheetService";

interface Props {
  userId: string;
  onAdded: (sheet: ReadingSheet) => void;
}

const EMPTY = {
  title: "",
  author: "",
  isbn: "",
  cover: "",
  status: "to_read",
  grade: "",
  review: "",
  quote: "",
};

export default function AddReadingSheetForm({ userId, onAdded }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const sheet = await addReadingSheetWithBook(userId, {
        title: form.title,
        author: form.author,
        isbn: form.isbn,
        cover: form.cover,
        status: form.status,
        grade: form.grade ? parseFloat(form.grade) : null,
        review: form.review,
        quote: form.quote,
      });
      onAdded(sheet);
      setForm(EMPTY);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
      <h3>Ajouter une fiche de lecture</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h4>Le livre</h4>
      <input name="title" placeholder="Titre *" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Auteur *" value={form.author} onChange={handleChange} required />
      <input name="cover" placeholder="URL de couverture" value={form.cover} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="to_read">À lire</option>
        <option value="reading">En cours</option>
        <option value="finished">Terminé</option>
      </select>

      <input
        name="grade"
        type="number"
        min="0"
        max="5"
        step="0.5"
        placeholder="Note (0 à 5)"
        value={form.grade}
        onChange={handleChange}
      />

      <textarea name="review" placeholder="Critique..." value={form.review} onChange={handleChange} rows={3} />
      <textarea name="quote" placeholder="Citation favorite..." value={form.quote} onChange={handleChange} rows={2} />

      <button type="submit" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter la fiche"}
      </button>
    </form>
  );
}