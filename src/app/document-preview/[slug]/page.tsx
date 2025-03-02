import { Metadata } from "next";
import DocumentPreview from "./DocumentPreview";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Convert slug to title case (e.g., "teknik-informatika" -> "Teknik Informatika")
  const title = (await params).slug;

  return {
    title: `${title} | Fakultas Sains dan Teknologi UIN Ar-Raniry`,
    description: `Halaman Program Studi ${title} Fakultas Sains dan Teknologi UIN Ar-Raniry`,
  };
}

export default async function DekanatPage() {
  return <DocumentPreview />;
}
