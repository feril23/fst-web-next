import { Metadata } from "next";
import StrukturOrganisasi from "./StrukturOrganisasi";

export const metadata: Metadata = {
  title: "Struktur Organisasi | Fakultas Sains dan Teknologi UIN Ar-Raniry",
  description: "Halaman Struktur Organisasi Fakultas Sains dan Teknologi UIN Ar-Raniry",
};

export default function StrukturOrganisasiPage() {
  return <StrukturOrganisasi />;
}
