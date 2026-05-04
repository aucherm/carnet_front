import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookShelf from "./pages/Bookshelf";
import ReadingSheet from "./pages/ReadingSheet";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookshelf" element={<BookShelf />} />
      <Route path="/reading-sheet" element={<ReadingSheet />} />
    </Routes>
  );
}