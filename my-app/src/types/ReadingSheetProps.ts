import type { ReadingSheetFormData } from "./ReadingSheetFormData";

export type ReadingSheetProps = {
  form: ReadingSheetFormData;
  hovered: number;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  setHovered: React.Dispatch<React.SetStateAction<number>>;
  setForm: React.Dispatch<React.SetStateAction<ReadingSheetFormData>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleDelete: () => Promise<void>;
  navigateBack: () => void;
};