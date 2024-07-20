import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useCustomers = () => {
  const apiUrl = "/api/customers/full";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    customers: data,
    isErrorCustomers: error,
    isLoadingCustomers: isLoading,
    mutateCustomers: mutate,
  };
};

export default useCustomers;
