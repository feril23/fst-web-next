import { Home } from "lucide-react";
import Link from "next/link";
export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <h1 className="text-4xl font-bold text-black">404</h1>
      <p className="mt-2 text-lg text-center">Oops! Halaman yang Anda cari tidak ditemukan.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center gap-2"
      >
        <Home className="w-5 h-5" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
  