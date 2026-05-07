type Props = {
  value: number;
  hovered: number;
  onHover: (value: number) => void;
  onLeave: () => void;
  onChange: (value: number) => void;
};

export default function StarRating({
  value,
  hovered,
  onHover,
  onLeave,
  onChange,
}: Props) {
  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          className="text-yellow-400 text-xl leading-none"
        >
          {star <= (hovered || value) ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}