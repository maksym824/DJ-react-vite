import { useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { User } from "~/types";

interface UserFetch {
  result: User;
}

const getUserData = () => {
  return apiClient.get<UserFetch>("/dj/me/details").then((res) => {
    return res.data.result;
  });
};

const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });
};

const updateUserData = (data: Partial<User>) => {
  return apiClient.post("/dj/me/details", data);
};

export { getUserData, useUserData, updateUserData };
