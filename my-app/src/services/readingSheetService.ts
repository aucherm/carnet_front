import type { ReadingSheet } from "../types/ReadingSheet";

export async function fetchReadingSheets(userId: string): Promise<ReadingSheet[]> {
  const res = await fetch(`/api/reading-sheets/user/${userId}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function addReadingSheetWithBook(
  userId: string,
  data: {
    title: string;
    author: string;
    isbn: string;
    cover: string;
    status: string;
    grade: number | null;
    review: string;
    quote: string;
  }
): Promise<ReadingSheet> {
  const res = await fetch(`/api/reading-sheets/user/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}