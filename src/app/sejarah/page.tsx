import { Metadata } from "next";
import Sejarah from "./Sejarah";

export const metadata: Metadata = {
  title: "Sejarah | Fakultas Sains dan Teknologi UIN Ar-Raniry",
  description: "Halaman Sejarah Fakultas Sains dan Teknologi UIN Ar-Raniry",
};

export default function DekanatPage() {
  return <Sejarah />;
}
