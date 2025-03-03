"use client";

import { FileText, Eye } from "lucide-react";
import { useDocument } from "../../contexts/DocumentContext";
import { useRouter } from "next/navigation";

interface Document {
  id: number;
  Document_Name: string;
  Document_Link: string;
}

export const Documents = ({ data }) => {
  const router = useRouter();
  const { setDocumentLink, setDocumentName } = useDocument();

  const handlePreview = (document: Document) => {
    setDocumentLink(document.Document_Link);
    setDocumentName(document.Document_Name);
    router.push(`/document-preview`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Dokumen Prodi</h3>
      {data?.Documents.length == 0 ? (
        <p className="text-sm text-gray-600">Informasi Dokumen belum tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.Documents.map((document: Document) => (
            <div
              key={document.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-teal-300 p-6"
            >
              <div className="flex flex-col items-center gap-4">
                <FileText className="w-16 h-16 text-teal-600" />
                <h4 className="font-semibold text-lg text-center">{document.Document_Name}</h4>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => handlePreview(document)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Preview</span>
                </button>
                <a
                  href={document.Document_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Documents;

