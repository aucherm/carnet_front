import type { ReadingSheet } from "../types/ReadingSheet";
import apiFetch from "./apiFetch";

export async function fetchReadingSheets(userId: string): Promise<ReadingSheet[]> {
  const res = await apiFetch(`/api/reading-sheets/user/${userId}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchReadingSheetById(id: string): Promise<ReadingSheet> {
  const res = await apiFetch(`/api/reading-sheets/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function addReadingSheetWithBook(userId: string, data: {
  title: string;
  author: string;
  isbn: string;
  cover: string;
  status: string;
  grade: number | null;
  review: string;
  quote: string;
}): Promise<ReadingSheet> {
  const res = await apiFetch(`/api/reading-sheets/user/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function updateReadingSheet(id: string, data: {
  title: string;
  author: string;
  isbn: string;
  cover: string;
  status: string;
  grade: number | null;
  review: string;
  quote: string;
}): Promise<ReadingSheet> {
  const res = await apiFetch(`/api/reading-sheets/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function deleteReadingSheet(id: string): Promise<void> {
  const res = await apiFetch(`/api/reading-sheets/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function fetchReadingSheetsByStatus(
  userId: string,
  status: "TO_READ" | "READING" | "FINISHED"
): Promise<ReadingSheet[]> {
  const res = await apiFetch(`/api/reading-sheets/user/${userId}/status/${status}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}