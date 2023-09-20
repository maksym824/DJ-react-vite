import { Fan, FanType } from "~/types";
import apiClient from "../api-client";
import { useInfiniteQuery } from "@tanstack/react-query";

type FanQuery = {
  pageSize: number;
  type: FanType;
};

const useFanList = (query: FanQuery) => {
  const fetchFanList = (pageParam: number) => {
    return apiClient
      .get<Fan[]>("/dj/me/fans", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          _type: query.type,
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  return useInfiniteQuery<Fan[], Error>({
    queryKey: ["fans", query],
    queryFn: ({ pageParam = 1 }) => fetchFanList(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

export { useFanList };
