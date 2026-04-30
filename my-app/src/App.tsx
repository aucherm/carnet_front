import { useEffect, useState } from "react";
import type { User } from "./types/User";
import type { Book } from "./types/Book";
import type { ReadingSheet } from "./types/ReadingSheet";
import { fetchAllBooks } from "./services/bookService";
import { fetchReadingSheets } from "./services/readingSheetService";
import AddBookForm from "./components/AddBookForm";
import EditBookForm from "./components/EditBookForm";
import AddReadingSheetForm from "./components/addReadingSheetForm";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [sheets, setSheets] = useState<ReadingSheet[]>([]);

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

  const handleBookAdded = (book: Book) =>
    setBooks((prev) => [...prev, book]);

  const handleBookUpdated = (updated: Book) => {
    setBooks((prev) =>
      prev.map((b) => (b.idBook === updated.idBook ? updated : b))
    );
    setEditingBook(null);
  };

  const handleSheetAdded = (sheet: ReadingSheet) => {
    setSheets((prev) => [...prev, sheet]);
    setBooks((prev) => {
      const exists = prev.some((b) => b.idBook === sheet.book.idBook);
      return exists ? prev : [...prev, sheet.book];
    });
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <p>
        Bonjour {user.firstName} {user.lastName} !
      </p>

      <AddBookForm onBookAdded={handleBookAdded} />

      <h3>Mes livres ({books.length})</h3>
      <ul>
        {books.map((b) => (
          <li key={b.idBook}>
            {b.title} — {b.author}
            <button onClick={() => setEditingBook(b)} style={{ marginLeft: 8 }}>
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

      <AddReadingSheetForm
        userId={user.idUser}
        onAdded={handleSheetAdded}
      />

      <h3>Mes fiches de lecture ({sheets.length})</h3>
      <ul>
        {sheets.map((s) => (
          <li key={s.idReadingSheet}>
            <strong>{s.book.title}</strong> — {s.status}
            {s.grade !== null && <> · {s.grade}/5</>}
            {s.review && <p>{s.review}</p>}
            {s.quote && <blockquote>{s.quote}</blockquote>}
          </li>
        ))}
      </ul>
    </div>
  );
}