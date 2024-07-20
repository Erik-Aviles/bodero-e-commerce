import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useCategories = () => {
  const apiUrl = "/api/categories/full";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    categories: data,
    isErrorSCategories: error,
    isLoadingCategories: isLoading,
    mutateCategories: mutate,
  };
};

export default useCategories;
