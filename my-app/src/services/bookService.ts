import type { Book } from "../types/Book";
import apiFetch from "./apiFetch";

const BASE = "/api/books";

export async function fetchAllBooks(): Promise<Book[]> {
  const res = await apiFetch(BASE);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function addBook(book: Omit<Book, "idBook">): Promise<Book> {
  const res = await apiFetch(BASE, {
    method: "POST",
    body: JSON.stringify(book),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function deleteBook(id: string): Promise<void> {
  const res = await apiFetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function updateBook(id: string, book: Omit<Book, "idBook">): Promise<Book> {
  const res = await apiFetch(`/api/books/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...book, idBook: id }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}