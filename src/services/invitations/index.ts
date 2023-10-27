import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { Invitee } from "~/types";

interface InviteeFetch {
  result: boolean;
  invitees: Invitee[];
}

interface PostQuery {
  pageSize: number;
  type?: number;
}

const useInvitee = (query: PostQuery) => {
  const fetchInvitee = (pageParam: number) => {
    return apiClient
      .get<InviteeFetch>("/dj/invitees", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          _type: query.type,
        },
      })
      .then((res) => {
        return res.data.invitees;
      });
  };

  return useInfiniteQuery<Invitee[], Error>({
    queryKey: ["invitee", query],
    queryFn: ({ pageParam = 1 }) => fetchInvitee(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

export { useInvitee };
