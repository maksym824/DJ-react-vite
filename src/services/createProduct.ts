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

export const setProductTrackData = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/product/audio/${post_token}`, data);
};

export const setProductVideoData = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/product/video/${post_token}`, data);
};

export const setProductFileData = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/product/file/${post_token}`, data);
};

export const setProductPodcastData = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/product/podcast/${post_token}`, data);
};