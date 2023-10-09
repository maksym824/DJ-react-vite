import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { Post } from "~/types";

interface PostFetch {
  result: Post[];
}

interface PostQuery {
  pageSize: number;
  type?: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = (pageParam: number) => {
    return apiClient
      .get<PostFetch>("/dj/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const updatePost = (post_id: number, data: Partial<Post>) => {
  return apiClient.patch<Post>(`/dj/post/${post_id}`, data);
};

const deletePost = (post_id: number) => {
  return apiClient.delete<Post>(`/dj/post/${post_id}`);
};

export { usePosts, updatePost, deletePost };
