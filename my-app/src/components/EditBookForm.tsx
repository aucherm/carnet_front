import { useState } from "react";
import type { Book } from "../types/Book";
import { updateBook } from "../services/bookService";
import BookField from "./BookFiels";

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
    <form className="flex flex-col gap-2 max-w-sm" onSubmit={handleSubmit}>
      <h3 className="font-bold">Modifier le livre</h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {(["title", "author", "isbn", "cover"] as const).map((field) => (
        <BookField
          key={field}
          name={field}
          label={field}
          value={form[field]}
          onChange={handleChange}
          required={field !== "cover"}
        />
      ))}

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded px-3 py-1"
        >
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-400 rounded px-3 py-1"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}