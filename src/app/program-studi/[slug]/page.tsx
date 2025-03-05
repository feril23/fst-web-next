import { Metadata } from "next";
import ProgramStudi from "./ProgramStudi";
import { getProgramData } from "../../../hooks/useFetchDataProgram";

export const dynamicParams = true;

export const revalidate = 600;

// 2. Generate static paths untuk slug yang valid
export async function generateStaticParams() {
  return [
    { slug: "teknologi-informasi" },
    { slug: "biologi" },
    { slug: "kimia" },
    { slug: "teknik-fisika" },
    { slug: "teknik-lingkungan" },
    { slug: "arsitektur" },
  ];
}

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

export default async function DekanatPage({ params }: { readonly params: { slug: string } }) {
  const { slug } = await params;
  const programData = await getProgramData(slug);
  return <ProgramStudi slug={slug} data={programData} />;
}

