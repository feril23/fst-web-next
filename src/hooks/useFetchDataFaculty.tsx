const CACHE_EXPIRATION = 600; // 10 menit dalam DETIK (untuk ISR)

export const dynamic = "force-dynamic";

export async function getFacultyData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faculty`, {
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

