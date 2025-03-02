// src/utils/fetcher.ts
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
};
