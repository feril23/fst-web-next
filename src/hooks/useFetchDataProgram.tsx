"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../services/api";

interface ProgramData {
  program: unknown;
  dosen: unknown;
}

const FetchProgramData = (programId: string) => {
  const [data, setData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const populateFields = [
      "Sosmed",
      "Mission",
      "Purpose",
      "Hero",
      "Study_Program_Secretary.lecture.Foto",
      "Services.Work_Schedule",
      "Services.Staff.Foto",
      "Facilities.Images",
      "Curriculums.Courses",
      "Head_of_Study_Program.lecture.Foto",
      "History",
      "Accreditation",
      "Job_Prospects",
      "Documents",
    ];

    const programMapping: Record<string, string> = {
      "teknologi-informasi": "information-technology",
      biologi: "biology",
      kimia: "chemical",
      "teknik-fisika": "physics",
      "teknik-lingkungan": "environmental-engineering",
      arsitektur: "architecture",
    };

    const programDosenMapping: Record<string, string> = {
      "teknologi-informasi": "TI",
      biologi: "BIO",
      kimia: "KIM",
      "teknik-fisika": "TF",
      "teknik-lingkungan": "TL",
      arsitektur: "ARS",
    };
    const programName = programMapping[programId] || programId;
    const programDosenName = programDosenMapping[programId] || programId;

    const fetchData = async () => {
      try {
        setLoading(true);

        const urlProgram = `https://fst-dashboard.up.railway.app/api/${programName}?${populateFields
          .map((field) => `populate=${field}`)
          .join("&")}`;
        const urlDosen = `https://fst-dashboard.up.railway.app/api/lectures?filters[Program][$eq]=${programDosenName}&populate=*`;
        const [programResponse, dosenResponse] = await Promise.all([
          axiosInstance.get(urlProgram),
          axiosInstance.get(urlDosen),
        ]);

        setData({
          program: programResponse.data.data,
          dosen: dosenResponse.data,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [programId]);

  return {
    data,
    loading,
    error,
  };
};

export default FetchProgramData;

