import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[calc(100vh-60px)] p-6">
        <div className="bg-white text-gray-900 rounded-3xl border-2 border-gray-800 w-80 overflow-hidden shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center px-5 pt-5">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📖</span>
            </div>
            <button
              onClick={() => navigate("/bookshelf")}
              className="text-gray-800 text-2xl hover:text-gray-600"
            >
              ➜
            </button>
          </div>

          {/* Illustration */}
          <div className="flex justify-center py-8 px-6">
            <img
              src="/pile.png"
              alt="pile de livres"
              className="w-56 h-56 object-contain"
            />
          </div>

          {/* Texte */}
          <div className="px-8 pb-10 text-center">
            <h1 className="text-2xl font-black mb-4">Hello !</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Un livre ouvert, c'est un monde de plus qui s'offre à toi. Plonge
              dans tes lectures, note tes ressentis, et laisse ton carnet
              raconter ton histoire.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
