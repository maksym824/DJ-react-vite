import { useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { UserStatistics } from "~/types";

interface UserStatisticsFetch {
  result: boolean;
  data: UserStatistics;
}

const getUserStatistics = () => {
  return apiClient.get<UserStatisticsFetch>("/dj/me/statistics").then((res) => {
    return res.data.data;
  });
};

const useUserStatistics = () => {
  return useQuery({
    queryKey: ["userStatistics"],
    queryFn: () => getUserStatistics(),
  });
};

export { getUserStatistics, useUserStatistics };
