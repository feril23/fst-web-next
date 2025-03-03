const CACHE_EXPIRATION = 600; // 10 menit dalam DETIK (untuk ISR)

export async function getFacultyData() {
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

    const res = await fetch(urlProgram, {
      next: { revalidate: CACHE_EXPIRATION }, // ISR: revalidate setiap 10 menit
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Gagal mengambil data:  ${res.status} Response: ${text}`);
    }
    return res.json();
  } catch (error) {
    throw new Error("Gagal mengambil data fakultas");
  }
}

