import useSWR from "swr";
import { fetchData } from "./api";

// Utility function to fetch data using SWR
const fetcher = async (url) => {
  const response = await fetchData(url);
  if (!response) {
    throw new Error("Failed to fetch data");
  }
  return response;
};

// Custom hook using SWR to fetch data
export const useData = (url) => {
  return useSWR(url, fetcher);
};
