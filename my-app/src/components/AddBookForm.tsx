import { useState } from "react";
import type { Book } from "../types/Book";
import { addBook } from "../services/bookService";

interface Props {
  onBookAdded: (book: Book) => void;
}

const EMPTY = { title: "", author: "", isbn: "", cover: "" };

export default function AddBookForm({ onBookAdded }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const created = await addBook(form);
      onBookAdded(created);
      setForm(EMPTY);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
      <h3>Ajouter un livre</h3>
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
      <button type="submit" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}