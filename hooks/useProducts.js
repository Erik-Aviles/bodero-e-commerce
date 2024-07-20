import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useProducts = () => {
  const apiUrl = "/api/products/full";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    products: data,
    isErrorProducts: error,
    isLoadingProducts: isLoading,
    mutateProducts: mutate,
  };
};
export default useProducts;
