// hooks/useBanners.js
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useCompany = () => {
  const apiUrl = "/api/companies/general";
  const {
    data: general,
    error,
    isLoading: isLoadingGeneral,
    mutate: mutateGeneral,
  } = useSWR(apiUrl, fetcher);

  const company = general?.at(0);
  const companyId = company?._id;

  return { company, error, companyId, isLoadingGeneral, mutateGeneral };
};
