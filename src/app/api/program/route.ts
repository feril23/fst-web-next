import { NextResponse } from "next/server";
import axiosInstance from "../../../services/api";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const namaProgram = searchParams.get("programName") || 1;
  const dosenProdi = searchParams.get("dosenProdi") || 1;

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

  // Jika tidak ada program, return error
  if (!namaProgram && !dosenProdi) {
    return Response.json({ error: "Nama program atau dosen tidak ditemukan" }, { status: 400 });
  }

  try {
    const urlProgram = `https://fst-dashboard.up.railway.app/api/${namaProgram}?${populateFields
      .map((field) => `populate=${field}`)
      .join("&")}`;
    const urlDosen = `https://fst-dashboard.up.railway.app/api/lectures?filters[Program][$eq]=${dosenProdi}&populate=*`;
    const [programResponse, dosenResponse] = await Promise.all([
      axiosInstance.get(urlProgram),
      axiosInstance.get(urlDosen),
    ]);

    return NextResponse.json(
      {
        program: programResponse.data.data,
        dosen: dosenResponse.data.data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600",
        },
      }
    );
  } catch (error) {
    return Response.json({ error: "Gagal mengambil data program" }, { status: 500 });
  }
}
