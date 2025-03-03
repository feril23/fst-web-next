import { Metadata } from "next";
import DocumentPreview from "./DocumentPreview";

export const dynamicParams = true;

export async function generateMetadata(): Promise<Metadata> {
  // Convert slug to title case (e.g., "teknik-informatika" -> "Teknik Informatika")

  return {
    title: `Document | Fakultas Sains dan Teknologi UIN Ar-Raniry`,
    description: `Halaman Document Fakultas Sains dan Teknologi UIN Ar-Raniry`,
  };
}

export default async function DekanatPage() {
  return <DocumentPreview />;
}
