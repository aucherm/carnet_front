export interface ReadingSheet {
  idReadingSheet: string;
  status: "TO_READ" | "READING" | "FINISHED";
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