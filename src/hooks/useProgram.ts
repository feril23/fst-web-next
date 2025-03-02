import { useState, useEffect } from 'react';
import { programAPI, handleAPIError } from '../services/api';
import { ProgramData } from '../utils';

interface UseProgramResult {
  data: ProgramData[keyof ProgramData] | null;
  error: string | null;
  loading: boolean;
}

export function useProgram(slug: string): UseProgramResult {
  const [data, setData] = useState<ProgramData[keyof ProgramData] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError(null);
        const programData = await programAPI.getProgramBySlug(slug);
        setData(programData);
      } catch (err) {
        setError(handleAPIError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [slug]);

  return { data, error, loading };
}