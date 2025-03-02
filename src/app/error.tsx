"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function ErrorPage({ error, reset }: Readonly<{ error: Error; reset: () => void }>) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-center">
      <div className="text-red-600 text-lg">Terjadi kesalahan saat mengambil data</div>
      <button
        onClick={() => router.refresh()}
        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Reload Page
      </button>
    </div>
  );
}
