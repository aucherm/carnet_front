interface Props {
  title: string;
  cover: string | null;
  grade: number | null;
}

export default function BookCard({ title, cover, grade }: Props) {
  return (
    <div className="flex flex-col bg-mint border-2 border-black rounded-2xl overflow-hidden items-center gap-1 md:gap-3">
      <div className="w-full h-48 bg-gray-100">
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
          <span key={s} className="text-green text-s md:text-2xl">
            {s <= (grade ?? 0) ? "★" : "☆"}
          </span>
        ))}
      </div>
    </div>
  );
}