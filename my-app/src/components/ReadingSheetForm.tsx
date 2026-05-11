import type { ReadingSheetProps } from "../types/ReadingSheetProps";
import StarRating from "./StarRating";

export default function ReadingSheetForm({
  form,
  hovered,
  loading,
  error,
  isEditing,
  setHovered,
  setForm,
  handleChange,
  handleSubmit,
  handleDelete,
  navigateBack,
}: ReadingSheetProps) {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Titre du livre *"
        className="w-full text-center font-black font-heading tracking-widest uppercase text-2xl mb-5"
      />

      <div className="mb-4">
        <div className="flex-1 flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Auteur.ice
            </label>

            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              className="bg-white w-full border border-black rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              ISBN
            </label>

            <input
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              className="bg-white w-full border border-black rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-600 mb-1 block">Statut</label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="bg-white w-full border border-black rounded px-2 py-1 text-sm"
        >
          <option value="to_read">À lire</option>
          <option value="reading">En cours</option>
          <option value="finished">Terminé</option>
        </select>
      </div>

      <StarRating
        value={form.grade}
        hovered={hovered}
        onHover={setHovered}
        onLeave={() => setHovered(0)}
        onChange={(grade) =>
          setForm((f) => ({
            ...f,
            grade,
          }))
        }
      />
<div className="mb-3">
        <label className="text-xs text-gray-600 mb-1 block">Avis</label>

        <textarea
          name="review"
          value={form.review}
          onChange={handleChange}
          rows={4}
          className="bg-white w-full border border-black rounded px-2 py-1 text-sm resize-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-xs text-gray-600 mb-1 block">
          Citation.s
        </label>

        <textarea
          name="quote"
          value={form.quote}
          onChange={handleChange}
          rows={3}
          className="bg-white w-full border border-black rounded px-2 py-1 text-sm resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-white flex-1 border-2 border-gray-800 rounded-full py-2 text-xs font-black uppercase tracking-widest hover:bg-orange transition-colors"
        >
          {loading ? "..." : isEditing ? "Modifier" : "Ajouter"}
        </button>

        {isEditing ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="bg-white flex-1 border-2 border-green text-green rounded-full py-2 text-xs font-black uppercase tracking-widest hover:bg-orange transition-colors"
          >
            Supprimer
          </button>
        ) : (
          <button
            type="button"
            onClick={navigateBack}
            className="bg-white flex-1 border-2 border-gray-800 rounded-full py-2 text-xs font-black uppercase tracking-widest hover:bg-orange transition-colors"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}