import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import BottomNav from "../components/BottomNav";
import type { ReadingSheet } from "../types/ReadingSheet";
import { fetchReadingSheetsByStatus } from "../services/readingSheetService";
import { fetchMe } from "../services/userService";

export default function ToReadPage() {
  const [books, setBooks] = useState<ReadingSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const user = await fetchMe();
        const data = await fetchReadingSheetsByStatus(user.idUser, "TO_READ");
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Layout>
      <NavBar />
      <BottomNav />
      <div className="min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="font-heading text-center font-black tracking-widest uppercase text-4xl mt-6 mb-6 md:text-6xl md:mt-15 md:mb-15">
              Pile à lire
            </h1>
          </div>
          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && books.length === 0 && (
            <p>Aucun livre dans votre pile à lire.</p>
          )}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {books.map((sheet) => (
              <div
                key={sheet.idReadingSheet}
                className="bg-mint border-2 border-black rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="aspect-2/3 bg-gray-100">
                  {sheet.book.cover ? (
                    <img
                      src={sheet.book.cover}
                      alt={sheet.book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No cover
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h2 className="font-black uppercase text-xs leading-tight">
                    {sheet.book.title}
                  </h2>
                  <p className="text-[10px] text-gray-600 mt-0.5">
                    {sheet.book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}