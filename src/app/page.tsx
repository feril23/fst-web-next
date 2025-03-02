import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Beranda | Fakultas Sains dan Teknologi UIN Ar-Raniry",
  description: "Halaman Utama Website Fakultas Sains dan Teknologi UIN Ar-Raniry",
};

export default function Home() {
  return <HomeContent />;
}

