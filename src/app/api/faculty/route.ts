import { NextResponse } from "next/server";
import axiosInstance from "../../../services/api";

export const dynamic = "force-static"; // Memaksa route menjadi statis
export const fetchCache = "force-no-store";
export const revalidate = 600;

export async function GET() {
  const populateFields = [
    "Mission",
    "Structure",
    "History",
    "Sosmed",
    "Advantages",
    "Facilitie.Images.Image",
    "Dean_Structure",
    "Hero.Image",
    "Dean_Structure.Dean.lecture.Foto",
    "Dean_Structure.Vice_Dean_1.lecture.Foto",
    "Dean_Structure.Vice_Dean_2.lecture.Foto",
    "Dean_Structure.Vice_Dean_3.lecture.Foto",
  ];

  try {
    const API_URL = `${process.env.STRAPI_URL}/api/faculty`;
    const urlProgram = `${API_URL}?${populateFields.map((field) => `populate=${field}`).join("&")}`;

    const response = await axiosInstance.get(urlProgram);
    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data fakultas", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
