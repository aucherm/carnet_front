import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex justify-center min-h-[calc(100vh-60px)] p-6">
        <div className="bg-white text-gray-900 rounded-3xl  w-full ">
          {/* Header */}
          <div className="flex justify-between items-center px-5 pt-5"></div>

          {/* Illustration */}
          <div className="flex justify-center">
            <img
              src="/pile.png"
              alt="pile de livres"
              style={{ width: "500px", height: "500px" }}
              className="object-contain"
            />
          </div>

          {/* Texte */}
          <div className="px-8 pb-10 text-center">
            <h1 className="text-2xl font-black mb-4">Hello !</h1>
            <p className="text-l text-gray-600 leading-relaxed">
              Un livre ouvert, c'est un monde de plus qui s'offre à toi. Plonge
              dans tes lectures, note tes ressentis, et laisse ton carnet
              raconter ton histoire.
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
}
