import apiClient from "../api-client";

const searchDJ = async (search: string) => {
  const res = await apiClient.get(`/dj/search?query=${search}`);

  return res.data?.result ?? [];
};

export { searchDJ };
