import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BookCard from "../components/BookCard";
import type { ReadingSheet } from "../types/ReadingSheet";
import { fetchReadingSheets } from "../services/readingSheetService";

export default function BookShelf() {
  const [sheets, setSheets] = useState<ReadingSheet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => fetchReadingSheets(data[0].idUser))
      .then(setSheets);
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-start min-h-[calc(100vh-60px)] p-6">
        <div className="bg-white text-gray-900 rounded-3xl border-2 border-gray-800 w-80 shadow-xl overflow-hidden">
          <div className="flex justify-between items-center px-5 pt-5">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📖</span>
            </div>
            <button
              onClick={() => navigate("/reading-sheet")}
              className="text-gray-800 text-2xl hover:text-gray-600"
            >
              ➜
            </button>
          </div>

          <h2 className="text-center font-black tracking-widest uppercase text-xl mt-6 mb-6">
            Ma Bibliothèque
          </h2>

          <div className="px-5 pb-8">
            {sheets.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">
                Aucune fiche de lecture pour l'instant.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {sheets.map((s) => (
                  <div
                    key={s.idReadingSheet}
                    className="cursor-pointer"
                    onClick={() => navigate(`/reading-sheet/${s.idReadingSheet}`)}
                  >
                    <BookCard
                      title={s.book.title}
                      cover={s.book.cover}
                      grade={s.grade}
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => navigate("/reading-sheet")}
              className="w-full mt-6 border-2 border-gray-800 rounded-full py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              + Ajouter une fiche
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}