import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 10;
  const searchQuery = searchParams.get("searchQuery") || "";
  try {
    // Konstruksi parameter untuk Strapi
    const searchFilter = searchQuery
      ? `&filters[$or][0][Name][$containsi]=${searchQuery}&filters[$or][1][NIP][$containsi]=${searchQuery}`
      : "";

    const strapiUrl = `${process.env.STRAPI_URL}/api/lectures?populate=*${searchFilter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true`;

    const response = await axios.get(strapiUrl);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
