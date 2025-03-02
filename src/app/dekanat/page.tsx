import { Metadata } from "next";
import Dekanat from "./Dekanat";

export const metadata: Metadata = {
  title: "Dekanat | Fakultas Sains dan Teknologi UIN Ar-Raniry",
  description: "Halaman Dekanat Dari Fakultas Sains dan Teknologi UIN Ar-Raniry",
};

export default function DekanatPage() {
  return <Dekanat />;
}
