import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant";

/**
 * Custom hook to fetch the company color based on the companyId.
 * @param companyId - The unique identifier for the company.
 * @returns The background color, loading state, and any error encountered.
 */
export const useCompanyColor = (companyId: string): { bgColor: string | null; isLoading: boolean; error: string | null } => {
  const [bgColor, setBgColor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyColor = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error before fetching
        const response = await axios.get<{ color: string }>(`${API_BASE_URL}/companies/${companyId}`);
        setBgColor(response.data.color);
      } catch (err: unknown) {
        console.error("Failed to fetch company color:", err);

        if (axios.isAxiosError(err) && err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("An unexpected error occurred.");
        }

        setBgColor(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyColor();
    } else {
      setBgColor(null);
      setError("Invalid company ID provided.");
      setIsLoading(false);
    }
  }, [companyId]);

  return { bgColor, isLoading, error };
};
