import API from "@/@lib/axios/api";
import { Statistics } from "@/@models/reports.model";
import { useQuery } from "@tanstack/react-query";

export const STATISTICS_QUERY_KEY = "statistics";

export function getStatisticsService() {
  const url = "/reports/statistics";
  return API.get<Statistics>({ url });
}

export const useGetStatistics = () => {
  return useQuery<Statistics>({
    queryKey: [STATISTICS_QUERY_KEY],
    queryFn: getStatisticsService
  });
};
