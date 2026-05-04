import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const LINKS = [
  { label: "HOME", path: "/" },
  { label: "BOOKSHELF", path: "/bookshelf" },
  { label: "READING SHEET", path: "/reading-sheet" },
];

export default function Layout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-around py-4 px-6 border-b border-gray-700">
        {LINKS.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`text-xs tracking-widest uppercase font-semibold transition-colors ${
              location.pathname === link.path
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Contenu */}
      {children}
    </div>
  );
}