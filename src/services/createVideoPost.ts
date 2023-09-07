import apiClient from "./api-client";

const setPostDataVideo = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/post/${post_token}`, data);
};

export default setPostDataVideo;
