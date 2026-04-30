import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddReadingSheetPage from "./pages/AddReadingSheetPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-sheet" element={<AddReadingSheetPage />} />
    </Routes>
  );
}