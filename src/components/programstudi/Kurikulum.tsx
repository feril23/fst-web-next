import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Kurikulum = ({ data }) => {
  const [openSemester, setOpenSemester] = useState<number | null>(0);

  const toggleSemester = (index: number) => {
    setOpenSemester(openSemester === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Kurikulum Prodi</h3>
      {data?.Curriculums.length == 0 ? (
        <p className="text-sm text-gray-600">
          Informasi Kurikulum belum tersedia.
        </p>
      ) : (
        data.Curriculums.map((semester, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className={`w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors ${
                openSemester === index ? "border-b border-gray-200" : ""
              }`}
              onClick={() => toggleSemester(index)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                {semester.Name}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openSemester === index ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {openSemester === index && (
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kode
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mata Kuliah
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SKS
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategori
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {semester.Courses.map((mk, mkIndex) => (
                        <tr key={mkIndex} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {mk.Code}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {mk.Name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {mk.SKS}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                mk.Category === "Mandatory"
                                  ? "bg-red-100 text-red-800"
                                  : mk.Category === "Elective"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {mk.Category}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan={2}
                          className="px-4 py-3 text-sm font-medium text-gray-900"
                        >
                          Total SKS
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {semester.Courses.reduce(
                            (acc, mk) => acc + mk.SKS,
                            0
                          )}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Kurikulum;
