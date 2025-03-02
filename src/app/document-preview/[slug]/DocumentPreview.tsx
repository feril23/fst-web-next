"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import PDFViewer from "../../../components/PDFViewer";
import { useDocument } from "../../../contexts/DocumentContext";
import { useRouter } from "next/navigation";

// Komponen untuk halaman "Dokumen Tidak Ditemukan"
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
    <h1 className="text-2xl font-bold">Dokumen Tidak Ditemukan</h1>
    <p className="mt-2 text-gray-600">Pastikan Anda memilih dokumen sebelum mengakses halaman ini.</p>
    <button
      onClick={() => window.history.back()}
      className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
    >
      Kembali
    </button>
  </div>
);

const DocumentPreview = () => {
  const { documentLink, documentName } = useDocument();
  const navigate = useRouter();
  const [isNotFound, setIsNotFound] = React.useState(false);

  // Cek localStorage saat pertama kali komponen dimuat
  React.useEffect(() => {
    const storedLink = localStorage.getItem("documentLink");

    if (!documentLink && !storedLink) {
      setIsNotFound(true);
    }
  }, [documentLink]);

  // Jika dokumen tidak ditemukan, tampilkan NotFound
  if (isNotFound) return <NotFound />;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate max-w-2xl">{documentName}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <PDFViewer url={documentLink} />
      </div>
    </main>
  );
};

export default DocumentPreview;

