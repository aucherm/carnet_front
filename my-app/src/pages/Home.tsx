import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import type { Book } from "../types/Book";
import type { ReadingSheet } from "../types/ReadingSheet";
import { fetchAllBooks } from "../services/bookService";
import { fetchReadingSheets } from "../services/readingSheetService";
import AddBookForm from "../components/AddBookForm";
import EditBookForm from "../components/EditBookForm";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [sheets, setSheets] = useState<ReadingSheet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        const currentUser = data[0];
        setUser(currentUser);
        return fetchReadingSheets(currentUser.idUser);
      })
      .then(setSheets);

    fetchAllBooks().then(setBooks);
  }, []);

  const handleBookUpdated = (updated: Book) => {
    setBooks((prev) =>
      prev.map((b) => (b.idBook === updated.idBook ? updated : b))
    );
    setEditingBook(null);
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <p className="text-lg font-medium mb-4">
        Bonjour {user.firstName} {user.lastName} !
      </p>

      <AddBookForm onBookAdded={(book) => setBooks((prev) => [...prev, book])} />

      <h3 className="text-xl font-semibold mt-6 mb-2">Mes livres ({books.length})</h3>
      <ul className="space-y-1 mb-6">
        {books.map((b) => (
          <li key={b.idBook} className="flex items-center gap-3">
            <span>{b.title} — {b.author}</span>
            <button
              onClick={() => setEditingBook(b)}
              className="text-sm underline text-blue-600"
            >
              Modifier
            </button>
          </li>
        ))}
      </ul>

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onUpdated={handleBookUpdated}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <button
        onClick={() => navigate("/add-sheet")}
        className="mt-4 bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold"
      >
        + Ajouter une fiche de lecture
      </button>

      <h3 className="text-xl font-semibold mt-6 mb-2">Mes fiches ({sheets.length})</h3>
      <ul className="space-y-2">
        {sheets.map((s) => (
          <li key={s.idReadingSheet} className="border rounded p-3">
            <strong>{s.book.title}</strong> — {s.status}
            {s.grade !== null && <> · {s.grade}/5</>}
            {s.review && <p className="text-sm text-gray-600">{s.review}</p>}
            {s.quote && <blockquote className="italic text-sm">{s.quote}</blockquote>}
          </li>
        ))}
      </ul>
    </div>
  );
}