import { useState } from "react";
import type { Book } from "../types/Book";
import { updateBook } from "../services/bookService";

interface Props {
  book: Book;
  onUpdated: (book: Book) => void;
  onCancel: () => void;
}

export default function EditBookForm({ book, onUpdated, onCancel }: Props) {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    cover: book.cover ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const updated = await updateBook(book.idBook, form);
      onUpdated(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
      <h3>Modifier le livre</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {(["title", "author", "isbn", "cover"] as const).map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          required={field !== "cover"}
        />
      ))}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={loading}>
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </button>
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}