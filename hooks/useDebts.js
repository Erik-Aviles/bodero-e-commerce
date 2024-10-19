import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useDebts = () => {
  const apiUrl = "/api/debts/full";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    debts: data,
    isErrorDebts: error,
    isLoadingDebts: isLoading,
    mutateDebts: mutate,
  };
};

export default useDebts;
