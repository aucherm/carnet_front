import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookShelf from "./pages/Bookshelf";
import ReadingSheetContainer from "./components/ReadingSheetContainer";
import ToReadPage from "./pages/ToReadPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <Routes>
      {/* Route publique */}
      <Route path="/login" element={<LoginPage />} />
      {/* Routes protégées */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/bookshelf" element={<ProtectedRoute><BookShelf /></ProtectedRoute>} />
      <Route path="/reading-sheet" element={<ProtectedRoute><ReadingSheetContainer /></ProtectedRoute>} />
      <Route path="/reading-sheet/:id" element={<ProtectedRoute><ReadingSheetContainer /></ProtectedRoute>} />
      <Route path="/to-read" element={<ProtectedRoute><ToReadPage /></ProtectedRoute>} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}