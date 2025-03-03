"use client";

import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, Loader2, RefreshCw } from "lucide-react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { extractGoogleDriveFileId } from "../utils/googleDrive";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

interface PDFViewerProps {
  url: string;
}

const PDFViewer = ({ url }: PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileId = extractGoogleDriveFileId(url);
  const viewerRef = useRef<HTMLDivElement>(null);

  const loadPDF = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://proxy-gdrive.up.railway.app/fetch-pdf/${fileId}`);
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const blob = await response.blob();
      const pdfObjectUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfObjectUrl);
    } catch (err) {
      setError("Gagal memuat PDF. Matikan terlebih dahulu Adblock atau IDM yang Anda miliki.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPDF();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const previousPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages || 1));

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = url.toString();
      link.click();
    }
  };

  // Menangani Zoom menggunakan Scroll Wheel
  const handleWheelZoom = (event: React.WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();
      setScale((prev) => Math.max(0.5, Math.min(2, prev + (event.deltaY > 0 ? -0.1 : 0.1))));
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-sm w-full">
      {/* Navigasi PDF */}
      <div className="flex flex-wrap items-center justify-between w-full mb-4 bg-white p-3 rounded-lg shadow-sm gap-2 md:gap-4">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
            className="p-2 hover:bg-gray-100 rounded-lg text-sm"
          >
            -
          </button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
            className="p-2 hover:bg-gray-100 rounded-lg text-sm"
          >
            +
          </button>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 text-sm w-10 md:w-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {pageNumber} of {numPages || "--"}
          </span>
          <button
            onClick={nextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 text-sm w-10 md:w-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 text-sm w-full md:w-auto justify-center"
        >
          <Download className="w-4 h-4" />
          <span className="font-medium">Download</span>
        </button>
      </div>

      {/* PDF Content - Bisa digeser di layar kecil */}
      <div
        ref={viewerRef}
        className="relative w-full bg-white rounded-lg shadow-sm overflow-auto touch-pan p-4"
        onWheel={handleWheelZoom}
        style={{
          maxWidth: "100%",
          maxHeight: "85vh",
          overflow: "auto",
          touchAction: "pan-x pan-y",
        }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[800px]">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
            <p className="text-gray-600">Loading PDF...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[800px] text-red-600">
            <p>{error}</p>
            <button
              onClick={loadPDF}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span className="text-sm font-medium">Reload PDF</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} scale={scale} renderTextLayer renderAnnotationLayer className="shadow-lg" />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;

