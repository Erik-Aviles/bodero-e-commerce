import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useStockCritical = () => {
  const apiUrl = "/api/products/critical";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    stockCritical: data,
    errorGetStockCritical: error,
    isLoadingStockCritical: isLoading,
    mutateStockCritical: mutate,
  };
};
export default useStockCritical;
