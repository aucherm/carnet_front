import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function BookField({ label, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`border border-gray-400 rounded px-2 py-1 bg-white text-sm ${props.className ?? ""}`}
      />
    </div>
  );
}