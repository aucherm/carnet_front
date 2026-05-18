import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addReadingSheetWithBook,
  deleteReadingSheet,
  fetchReadingSheetById,
  updateReadingSheet,
} from "../services/readingSheetService";
import type { ReadingSheetFormData } from "../types/ReadingSheetFormData";

const EMPTY: ReadingSheetFormData = {
  title: "",
  author: "",
  isbn: "",
  cover: "",
  status: "TO_READ",
  grade: 0,
  review: "",
  quote: "",
};
export function useReadingSheet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = !!id;

  const [form, setForm] = useState<ReadingSheetFormData>(EMPTY);
  const [hovered, setHovered] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => setUserId(data[0].idUser));
  }, []);

  useEffect(() => {
    if (!id) return;

    fetchReadingSheetById(id).then((sheet) => {
      setForm({
        title: sheet.book.title,
        author: sheet.book.author,
        isbn: sheet.book.isbn,
        cover: sheet.book.cover ?? "",
        status: sheet.status,
        grade: sheet.grade ?? 0,
        review: sheet.review ?? "",
        quote: sheet.quote ?? "",
      });
    });
  }, [id]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditing && !userId) return;

    setError(null);
    setLoading(true);

    try {
      if (isEditing && id) {
        await updateReadingSheet(id, {
          ...form,
          grade: form.grade || null,
        });
      } else {
        await addReadingSheetWithBook(userId!, {
          ...form,
          grade: form.grade || null,
        });
      }

      navigate("/bookshelf");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!id) return;

    if (!window.confirm("Supprimer cette fiche de lecture ?")) {
      return;
    }

    setLoading(true);

    try {
      await deleteReadingSheet(id);
      navigate("/bookshelf");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    hovered,
    setHovered,
    loading,
    error,
    isEditing,
    handleChange,
    handleSubmit,
    handleDelete,
    navigateBack: () => navigate("/bookshelf"),
  };
}
