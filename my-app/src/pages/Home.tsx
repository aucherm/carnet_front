import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <Layout>
      <NavBar />
      <BottomNav /> 
      <div className="flex justify-center min-h-[calc(100vh-60px)] p-6 md:flex-col">
        <div className="bg-white text-gray-900 rounded-3xl w-full">
          <div className="flex justify-between items-center px-5"></div>
          <div className="flex justify-center">
            <img
              src="/pile.png"
              alt="pile de livres"
              style={{ width: "500px", height: "500px" }}
              className="object-contain"
            />
          </div>
          <div className="px-6 pb-10 text-center">
            <h1 className="text-3xl font-black mb-4">Hello !</h1>
            <p className="text-xl text-gray-600 leading-relaxed md:max-w-md mx-auto">
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