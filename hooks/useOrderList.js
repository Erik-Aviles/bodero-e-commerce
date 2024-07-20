import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useOrderList = () => {
  const apiUrl = "/api/orderslist/full";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    orderlist: data,
    isErrorOrderList: error,
    isLoadingOrderList: isLoading,
    mutateOrderList: mutate,
  };
};

export default useOrderList;
