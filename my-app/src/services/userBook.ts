import type { Book } from "../types/Book";

export async function fetchCurrentBook(): Promise<Book> {
  const res = await fetch("/api/books");

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  let books: Book[];

  try {
    books = await res.json();
  } catch {
    throw new Error("Réponse JSON invalide");
  }

  if (!Array.isArray(books) || books.length === 0) {
    throw new Error("Aucun livre trouvé");
  }

  return books[0];
}