import type { Book } from "../types/Book";

export async function fetchCurrentUser(): Promise<Book> {
  const res = await fetch("/api/books");
  console.log("Status:", res.status);
  console.log("URL:", res.url);
  if (!res.ok) throw new Error("Impossible de récupérer les utilisateurs");
  const books: Book[] = await res.json();
  return books[0];
}