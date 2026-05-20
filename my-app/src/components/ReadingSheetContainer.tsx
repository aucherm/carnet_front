import ReadingSheetDesktop from "./ReadingSheetDesktop";
import ReadingSheetMobile from "./ReadingSheetMobile";
import { useReadingSheet } from "./useReadingSheet";

export default function ReadingSheetContainer() {
  const logic = useReadingSheet();

  return (
    <>
      {/* MOBILE */}

      <div className="block md:hidden">
        <ReadingSheetMobile {...logic} />
      </div>

      {/* DESKTOP */}

      <div className="hidden md:block">
        <ReadingSheetDesktop {...logic} />
      </div>
    </>
  );
}