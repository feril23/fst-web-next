import { Metadata } from "next";
import TenagaKependidikan from "./TenagaKependidikan";

export const metadata: Metadata = {
  title: "Tenaga Kependidikan | Fakultas Sains dan Teknologi UIN Ar-Raniry",
  description: "Halaman Tenaga Kependidikan Fakultas Sains dan Teknologi UIN Ar-Raniry",
};

export default function DekanatPage() {
  return <TenagaKependidikan />;
}
