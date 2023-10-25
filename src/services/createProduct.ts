import apiClient from "./api-client";

export type ProductPayload = {
  name: string;
  description: string;
  artwork?: string;
  price: string;
  genre: string;
  release_date: string;
  label: string;
  artist: string;
  filename?: string;
  download?: string;
};

const setProductData = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/product/audio/${post_token}`, data);
};

export default setProductData;
