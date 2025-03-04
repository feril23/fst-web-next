// app/api/fetch-pdf/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");
  if (!fileId) return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  
  // Contoh URL eksternal, ganti sesuai kebutuhan
  const externalUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
  
  const response = await fetch(externalUrl);
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
  }
  const blob = await response.blob();
  
  // Sertakan header CORS jika diperlukan
  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
