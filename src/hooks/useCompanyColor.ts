import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../constants';

/**
 * Custom hook to fetch the company color based on the companyId.
 * @param companyId - The unique identifier for the company.
 * @returns The background color and loading state.
 */
export const useCompanyColor = (companyId: string): { bgColor: string; isLoading: boolean } => {
  const [bgColor, setBgColor] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompanyColor = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<{ color: string }>(`${API_BASE_URL}/companies/${companyId}`);
        setBgColor(response.data.color);
      } catch (error) {
        console.error("Failed to fetch company color:", error);
        setBgColor(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyColor();
    }
  }, [companyId]);

  return { bgColor, isLoading };
};
