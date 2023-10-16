import apiClient from "./api-client";

const setPostData = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/post/${post_token}`, data);
};

export default setPostData;
