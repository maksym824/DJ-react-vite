import apiClient from "../api-client";

const getCountryList = async () => {
  const res = await apiClient.get(`/dj/countries`);
  const { data } = res;
  return data ?? [];
};

export default getCountryList;
