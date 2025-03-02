"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../services/api";
import axios from "axios";

interface TenagaKependidikanResponse {
  data: any[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const useFetchTenagaKependidikan = (page: number, pageSize: number, searchQuery: string) => {
  const [data, setData] = useState<TenagaKependidikanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/tenaga-kependidikan?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`
        );

        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, searchQuery]);

  return { data, loading, error };
};

export default useFetchTenagaKependidikan;

