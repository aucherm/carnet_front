import { useEffect, useState } from "react";
import type { User } from "./types/User";
import type { Book } from "./types/Book";
import { fetchAllBooks } from "./services/bookService";
import AddBookForm from "./components/AddBookForm";
import EditBookForm from "./components/EditBookForm";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(d => setUser(d[0]));
    fetchAllBooks().then(setBooks);
  }, []);

  const handleBookAdded = (book: Book) =>
    setBooks(prev => [...prev, book]);

  const handleBookUpdated = (updated: Book) => {
    setBooks(prev => prev.map(b => b.idBook === updated.idBook ? updated : b));
    setEditingBook(null);
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <p>Bonjour {user.firstName} {user.lastName} !</p>

      <AddBookForm onBookAdded={handleBookAdded} />

      <h3>Mes livres ({books.length})</h3>
      <ul>
        {books.map(b => (
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
    </div>
  );
}