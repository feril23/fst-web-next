import { Metadata } from "next";
import VisiMisi from "./VisiMisi";

export const metadata: Metadata = {
  title: "Visi dan Misi | Fakultas Sains dan Teknologi UIN Ar-Raniry",
  description: "Halaman Visi dan Misi Fakultas Sains dan Teknologi UIN Ar-Raniry",
};

export default function DekanatPage() {
  return <VisiMisi />;
}
