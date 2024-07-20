import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useOrder = () => {
  const apiUrl = "/api/orders/full";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    orders: data,
    isErrorOrders: error,
    isLoadingOrders: isLoading,
    mutateOrders: mutate,
  };
};

export default useOrder;
