"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <h1 className="text-4xl font-bold text-black">404</h1>
      <p className="mt-2 text-lg text-center">Oops! Halaman yang Anda cari tidak ditemukan.</p>
      <button
        onClick={() => navigate.push("/")}
        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 flex items-center gap-2"
      >
        <Home className="w-5 h-5" />
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default NotFound;
