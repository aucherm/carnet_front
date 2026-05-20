import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="hidden md:flex justify-around py-4 px-6 border-b border-gray-700">
      <div className="flex items-center w-full">
        <Logo />
        <div className="flex-1 flex items-center justify-around">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors px-4 py-2 rounded-4xl ${
                isActive ? "text-black bg-orange" : "text-gray-500 hover:bg-green"
              }`
            }
          >
            <IoHomeOutline className="text-2xl" />
            Accueil
          </NavLink>
          <NavLink
            to="/bookshelf"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors px-4 py-2 rounded-4xl ${
                isActive ? "text-black bg-orange" : "text-gray-500 hover:bg-green"
              }`
            }
          >
            <GiBookshelf className="text-2xl" />
            Bookshelf
          </NavLink>
          <NavLink
            to="/reading-sheet"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors px-4 py-2 rounded-4xl ${
                isActive ? "text-black bg-orange" : "text-gray-500 hover:bg-green"
              }`
            }
          >
            <FaPlus className="text-2xl" />
            Reading Sheet
          </NavLink>
          <NavLink
            to="/to-read"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors px-4 py-2 rounded-4xl ${
                isActive ? "text-black bg-orange" : "text-gray-500 hover:bg-green"
              }`
            }
          >
            <FaRegCheckSquare className="text-2xl" />
            Pile à lire
          </NavLink>

          {/* Bouton déconnexion */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors px-4 py-2 rounded-4xl text-gray-500 hover:bg-green"
          >
            <IoLogOutOutline className="text-2xl" />
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}