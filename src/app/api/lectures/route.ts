// pages/api/lecturers.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { program } = req.query;

  try {
    const response = await fetch(`${process.env.STRAPI_URL}/lectures?filters[Program][$eq]=${program}&populate=*`);
    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data dosen" });
  }
}
