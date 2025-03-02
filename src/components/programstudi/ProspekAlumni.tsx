import React from "react";
import { Briefcase, Lightbulb, UserCog, GraduationCap } from "lucide-react";

const ProspekAlumni = ({ data }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Prospek Alumni</h3>
      {/* Prospects Grid */}
      {data?.Job_Prospects.length == 0 ? (
        <p className="text-sm text-gray-600">
          Informasi Prospek Alumni belum tersedia.
        </p>
      ) : (
        <div className="grid gap-6">
          {data.Job_Prospects.map((prospect, index) => {
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-teal-300"
              >
                <div className="flex items-start gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {prospect.Title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {prospect.Description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProspekAlumni;
