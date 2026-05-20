import { useState } from "react";
import type { Book } from "../types/Book";
import { addBook } from "../services/bookService";
import BookField from "./BookFiels";

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-sm"
    >
      <h3 className="font-bold">Ajouter un livre</h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {(["title", "author", "isbn", "cover"] as const).map((field) => (
        <BookField
          key={field}
          name={field}
          label={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          required={field !== "cover"}
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded px-3 py-1 mt-2"
      >
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}