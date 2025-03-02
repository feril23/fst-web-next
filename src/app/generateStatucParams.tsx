export function generateStaticParams() {
  return [
    { slug: [""] }, // Untuk halaman utama (tanpa slug)
    { slug: ["program-studi", "teknologi-informasi"] },
    { slug: ["program-studi", "teknik-fisika"] },
    { slug: ["program-studi", "teknik-lingkungan"] },
    { slug: ["program-studi", "arsitektur"] },
    { slug: ["program-studi", "kimia"] },
    { slug: ["program-studi", "biologi"] },
    { slug: ["tentang-kami"] },
  ];
}
