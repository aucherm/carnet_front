import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BookCard from "../components/BookCard";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
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
    <NavBar></NavBar>
         <div className="md:hidden">
         <Logo />
         </div>
      <div className="flex justify-center">
        <div className="bg-white text-gray-900 rounded-3xl ">
          <div className="flex"></div>

          <h2 className="font-heading text-center font-black tracking-widest uppercase text-4xl mt-6 mb-6 md:text-6xl md:mt-15 md:mb-15 ">
            Ma Bibliothèque
          </h2>

          <div className="px-5 pb-8">
            {sheets.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">
                Aucune fiche de lecture pour l'instant.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-8">
                {sheets.map((s) => (
                  <div
                    key={s.idReadingSheet}
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`/reading-sheet/${s.idReadingSheet}`)
                    }
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
              className="w-full mt-6 border-2 border-gray-800 rounded-full py-2 text-sm font-bold uppercase tracking-wider hover:bg-mint transition-colors md:fixed md:bottom-20 md:left-1/2 md:-translate-x-1/2 md:w-80"
            >
              + Ajouter une fiche
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
}
