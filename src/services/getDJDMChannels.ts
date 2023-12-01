import apiClient from "../services/api-client";

const getDJDMChannels = async () => {
  return apiClient.get("dj/me/stream/channels").then((res) => {
    if (res?.data?.result) return res?.data?.channels;
    return [];
  });
};

export default getDJDMChannels;
