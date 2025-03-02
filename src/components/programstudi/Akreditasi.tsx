"use client";

import { FileText, Award } from "lucide-react";

export const Akreditasi = ({ data }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Akreditasi Prodi</h3>
      {data?.Accreditation == null ? (
        <p className="text-sm text-gray-600">Informasi Akreditasi belum tersedia.</p>
      ) : (
        <div className="p-4 flex flex-row justify-between md:items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-teal-300">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{data.Accreditation.Grade}</h1>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <FileText className="w-5 w-5 flex-shrink-0" />
                <a href={data.Accreditation.Document_Link}>{data.Accreditation.Document_Name}</a>
              </div>
              <div className="flex gap-3 items-center">
                <FileText className="w-5 w-5 flex-shrink-0" />
                <p>{data.Accreditation.Est}</p>
              </div>
            </div>
          </div>
          <Award className="hidden md:block h-24 w-24 " />
        </div>
      )}
    </div>
  );
};

export default Akreditasi;

