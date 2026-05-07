import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import ReadingSheetForm from "./ReadingSheetForm";
import type { ReadingSheetProps } from "../types/ReadingSheetProps";

export default function ReadingSheetMobile(props: ReadingSheetProps) {
  return (
    <Layout>
      <NavBar />

      <div className="md:hidden">
        <Logo />
      </div>

      <div className="flex justify-center items-center py-6 px-4">
        <div className="bg-mint rounded-xl border-2 border-gray-800 w-full max-w-sm shadow-xl overflow-hidden p-5">
          <ReadingSheetForm {...props} />
        </div>
      </div>

      <BottomNav />
    </Layout>
  );
}