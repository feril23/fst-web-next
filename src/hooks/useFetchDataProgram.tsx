"use client";

import { useEffect, useState } from "react";

const FetchProgramData = (programId: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

        const urlProgram = `/api/program?programName=${programName}&dosenProdi=${programDosenName}`;
        const response = await fetch(urlProgram, {
          next: { revalidate: 600 }, // Cache selama 5 menit
        });

        const data = await response.json();

        setData(data);
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

