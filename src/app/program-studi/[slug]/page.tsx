import { Metadata } from "next";
import ProgramStudi from "./ProgramStudi";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Convert slug to title case (e.g., "teknik-informatika" -> "Teknik Informatika")
  const title = (await params).slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Program Studi ${title} | Fakultas Sains dan Teknologi UIN Ar-Raniry`,
    description: `Halaman Program Studi ${title} Fakultas Sains dan Teknologi UIN Ar-Raniry`,
  };
}

export default async function DekanatPage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return <ProgramStudi slug={slug} />;
}
