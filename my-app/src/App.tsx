import { useEffect, useState } from "react";
import type { User } from "./types/User";
import type { Book } from "./types/Book";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));

    fetch("/api/books") 
      .then((res) => res.json())
      .then((data) => setBook(data[0]));
  }, []);

  if (!user || !book) return <p>Chargement...</p>;

  return (
    <div>
      <p>
        Bonjour {user.firstName} {user.lastName} ! Voici ton adresse mail (
        {user.mail})
      </p>
      <p>
        Ton dernier livre lu est {book.title}, écrit par {book.author}
      </p>
    </div>
  );
}