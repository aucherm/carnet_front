import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookShelf from "./pages/Bookshelf";
import ReadingSheetContainer from "./components/ReadingSheetContainer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookshelf" element={<BookShelf />} />
      <Route path="/reading-sheet" element={<ReadingSheetContainer />} />
      <Route path="/reading-sheet/:id" element={<ReadingSheetContainer />} />
    </Routes>
  );
}
