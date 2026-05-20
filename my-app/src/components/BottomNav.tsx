import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="md:hidden flex justify-between items-center px-4 py-2  bg-white">
        <Logo />
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs tracking-widest uppercase font-semibold text-gray-500"
        >
          <IoLogOutOutline className="text-2xl" />
          Déconnexion
        </button>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white md:hidden">
        <div className="flex justify-around items-center py-2 text-xs font-medium">
          <NavLink to="/" className="flex flex-col items-center text-black">
            {({ isActive }) => (
              <span
                className="flex items-center justify-center w-17 h-17 rounded-full text-5xl"
                style={isActive ? { backgroundColor: "var(--color-orange)" } : {}}
              >
                <IoHomeOutline />
              </span>
            )}
          </NavLink>
          <NavLink to="/bookshelf" className="flex flex-col items-center text-black">
            {({ isActive }) => (
              <span
                className="flex items-center justify-center w-17 h-17 rounded-full text-5xl"
                style={isActive ? { backgroundColor: "var(--color-orange)" } : {}}
              >
                <GiBookshelf />
              </span>
            )}
          </NavLink>
          <NavLink to="/reading-sheet" className="flex flex-col items-center text-black">
            {({ isActive }) => (
              <span
                className="flex items-center justify-center w-17 h-17 rounded-full text-5xl"
                style={isActive ? { backgroundColor: "var(--color-orange)" } : {}}
              >
                <FaPlus />
              </span>
            )}
          </NavLink>
          <NavLink to="/to-read" className="flex flex-col items-center text-black">
            {({ isActive }) => (
              <span
                className="flex items-center justify-center w-17 h-17 rounded-full text-5xl"
                style={isActive ? { backgroundColor: "var(--color-orange)" } : {}}
              >
                <FaRegCheckSquare />
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </>
  );
}