export interface ReadingSheet {
  idReadingSheet: string;
  status: "to_read" | "reading" | "finished";
  grade: number | null;
  review: string | null;
  quote: string | null;
  createdAt: string;
  book: {
    idBook: string;
    title: string;
    author: string;
    isbn: string;
    cover: string | null;
  };
}