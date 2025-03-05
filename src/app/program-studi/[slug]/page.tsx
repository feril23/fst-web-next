import { Metadata } from "next";
import ProgramStudi from "./ProgramStudi";

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

async function getProgramData(slug: string) {
  const programMapping: Record<string, string> = {
    "teknologi-informasi": "information-technology",
    biologi: "biology",
    kimia: "chemical",
    "teknik-fisika": "physics",
    "teknik-lingkungan": "environmental-engineering",
    arsitektur: "architecture",
  };

  const programDosenMapping: Record<string, string> = {
    "teknologi-informasi": "TI",
    biologi: "BIO",
    kimia: "KIM",
    "teknik-fisika": "TF",
    "teknik-lingkungan": "TL",
    arsitektur: "ARS",
  };

  const programName = programMapping[slug] || slug;
  const programDosenName = programDosenMapping[slug] || slug;

  const populateFields = [
    "Sosmed",
    "Mission",
    "Purpose",
    "Hero",
    "Study_Program_Secretary.lecture.Foto",
    "Services.Work_Schedule",
    "Services.Staff.Foto",
    "Facilities.Images",
    "Curriculums.Courses",
    "Head_of_Study_Program.lecture.Foto",
    "History",
    "Accreditation",
    "Job_Prospects",
    "Documents",
  ];

  // Gunakan environment variable untuk URL API eksternal
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL tidak diset di environment");
  }

  const urlProgram = `${baseUrl}/api/${programName}?${populateFields.map((field) => `populate=${field}`).join("&")}`;
  const urlDosen = `${baseUrl}/api/lectures?filters[Program][$eq]=${programDosenName}&populate=*`;

  // Lakukan fetching menggunakan fetch dan dukung ISR dengan opsi next.revalidate
  const [programRes, dosenRes] = await Promise.all([
    fetch(urlProgram, { next: { revalidate: 600 } }),
    fetch(urlDosen, { next: { revalidate: 600 } }),
  ]);

  if (!programRes.ok) {
    throw new Error(`Gagal mengambil data program: ${programRes.status}`);
  }
  if (!dosenRes.ok) {
    throw new Error(`Gagal mengambil data dosen: ${dosenRes.status}`);
  }

  const programData = await programRes.json();
  const dosenData = await dosenRes.json();

  return {
    program: programData.data,
    dosen: dosenData.data,
  };
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
  const { slug } = params;
  const programData = await getProgramData(slug);
  return <ProgramStudi slug={slug} data={programData} />;
}

