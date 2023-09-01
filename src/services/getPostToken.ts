import { PostType } from "../types";
import apiClient from "./api-client";

const getPostToken = async (type: PostType) => {
  const res = await apiClient.get(`/dj/post/token?_post_type=${type}`);
  const {
    data: { data },
  } = res;
  if (data.post_token) return data.post_token as string;
  return "";
};

export default getPostToken;
