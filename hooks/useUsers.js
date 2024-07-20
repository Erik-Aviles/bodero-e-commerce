import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useUsers = () => {
  const apiUrl = "/api/users/full";
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    users: data,
    isErrorUsers: error,
    isLoadingUsers: isLoading,
    mutateUsers: mutate,
  };
};

export default useUsers;
