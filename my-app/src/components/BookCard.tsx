interface Props {
  title: string;
  cover: string | null;
  grade: number | null;
}

export default function BookCard({ title, cover, grade }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 md:gap-3">
      <div className="w-38 h-55 rounded-lg overflow-hidden border border-gray-300 bg-gray-200">
        {cover ? (
          <img src={cover} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 text-center px-1">
            {title}
          </div>
        )}
      </div>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className="text-yellow-400 text-sm md:text-2xl">
            {s <= (grade ?? 0) ? "★" : "☆"}
          </span>
        ))}
      </div>
    </div>
  );
}