import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import Logo from "./Logo";
import { FaRegCheckSquare } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="hidden md:flex justify-around py-4 px-6 border-b border-gray-700">
      <div className="flex items-center w-full">
        <Logo />
        <div className="flex-1 flex items-center justify-around">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors ${
                isActive ? "text-black" : "text-gray-500 hover:text-gray-300"
              }`
            }
          >
            <IoHomeOutline className="text-2xl" />
            Accueil
          </NavLink>
          <NavLink
            to="/bookshelf"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors ${
                isActive ? "text-black" : "text-gray-500 hover:text-gray-300"
              }`
            }
          >
            <GiBookshelf className="text-2xl" />
            Bookshelf
          </NavLink>
          <NavLink
            to="/reading-sheet"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors ${
                isActive ? "text-black" : "text-gray-500 hover:text-gray-300"
              }`
            }
          >
            <FaPlus className="text-2xl" />
            Reading Sheet
          </NavLink>

            <NavLink
            to="/to-read"
            className={({ isActive }) =>
              `flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors ${
                isActive ? "text-black" : "text-gray-500 hover:text-gray-300"
              }`
            }
          >
            <FaRegCheckSquare className="text-2xl" />
            Pile à lire
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
