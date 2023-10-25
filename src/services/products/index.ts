import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { Product } from "~/types";

interface ProductFetch {
  result: boolean;
  products: Product[];
}

interface PostQuery {
  pageSize: number;
  type?: number;
}

const useProduct = (query: PostQuery) => {
  const fetchPosts = (pageParam: number) => {
    return apiClient
      .get<ProductFetch>("/dj/products", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          _type: query.type,
        },
      })
      .then((res) => {
        return res.data.products;
      });
  };

  return useInfiniteQuery<Product[], Error>({
    queryKey: ["products", query],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const deleteProduct = (product_id: number) => {
  return apiClient.delete<Product>(`/dj/product/${product_id}`);
};

const getProductById = (product_id: number) => {
  return apiClient.get<ProductFetch>(`/dj/product/${product_id}`);
};

const updateProduct = (
  product_id: number,
  post_token: string,
  data: Partial<Product>
) => {
  return apiClient.patch<{ result: boolean }>(
    `/dj/product/${product_id}/${post_token}`,
    data
  );
};

export { useProduct, deleteProduct, getProductById, updateProduct };
