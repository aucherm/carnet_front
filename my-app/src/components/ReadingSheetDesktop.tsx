import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import ReadingSheetForm from "./ReadingSheetForm";
import type { ReadingSheetProps } from "../types/ReadingSheetProps";

export default function ReadingSheetDesktop(props: ReadingSheetProps) {
  return (
    <Layout>
      <NavBar />
      <div className="min-h-screen px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-mint border-2 border-gray-800 rounded-4xl overflow-hidden shadow-2xl grid grid-cols-[420px_1fr]">
            {/* LEFT PANEL */}

            <div className="border-r-2 border-gray-800 bg-green/50 p-10 flex flex-col items-center justify-center">
              {/* COVER */}

              {props.form.cover ? (
                <img
                  src={props.form.cover}
                  alt={props.form.title}
                  className="
                    w-72
                    h-105
                    object-cover
                    rounded-2xl
                    border-2
                    border-black
                    shadow-xl
                  "
                />
              ) : (
                <div
                  className="
                    w-72
                    h-105
                    rounded-2xl
                    border-2
                    border-dashed
                    border-black
                    flex
                    items-center
                    justify-center
                    text-gray-500
                    uppercase
                    tracking-widest
                    text-sm
                    bg-mint
                  "
                >
                  No Cover
                </div>
              )}

              {/* BOOK INFOS */}

              <div className="mt-8 text-center w-full">
                <h1
                  className="
                    text-3xl
                    font-black
                    uppercase
                    tracking-[0.2em]
                    leading-tight
                    wrap-break-word
                  "
                >
                  {props.form.title || "Titre du livre"}
                </h1>

                <p className="mt-4 text-lg text-gray-700">
                  {props.form.author || "Auteur.ice"}
                </p>

                {props.form.isbn && (
                  <p className="mt-2 text-xs tracking-widest text-gray-500 uppercase">
                    ISBN · {props.form.isbn}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT PANEL */}

            <div className="p-12 flex items-center">
              <div className="w-full max-w-2xl mx-auto">
                {/* HEADER */}

                <div className="mb-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                    Reading Sheet
                  </p>

                  <h2 className="text-5xl font-black uppercase tracking-wider leading-none">
                    {props.form.title || "Titre du livre"}
                  </h2>
                </div>

                {/* FORM */}

                <ReadingSheetForm {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
