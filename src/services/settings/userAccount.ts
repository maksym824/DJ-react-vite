import { useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { UserAccount } from "~/types";

interface UserAccountFetch {
  result: UserAccount;
}

const getUserAccount = () => {
  return apiClient.get<UserAccountFetch>("/dj/me").then((res) => {
    return res.data.result;
  });
};

const useUserAccount = () => {
  return useQuery({
    queryKey: ["userAccount"],
    queryFn: () => getUserAccount(),
  });
};

const updateUserAccount = (data: Partial<UserAccount>) => {
  return apiClient.post("/dj/me", data);
};

const changeEmailAddress = () => {
  return apiClient.get("/dj/me/change_email");
};

const resetPassword = () => {
  return apiClient.get("/dj/me/reset_password");
};

const deleteUserAccount = () => {
  return apiClient.delete("/dj/me/delete_account");
};

const useUsernameCheck = (username?: string) => {
  const checkUsername = () =>
    apiClient
      .get<{ result: boolean; profile_url: string; message: string }>(
        `/dj/me/profile_url/${username}`
      )
      .then((res) => {
        return res.data.result;
      });

  return useQuery({
    queryKey: ["usernameCheck", username],
    queryFn: async () => {
      if ((username?.length  ?? 0) < 2) {
        return false;
      }
      const testRes = /^[a-zA-Z0-9\-_]{3,50}$/.test(username ?? "");
      if (!testRes) {
        return false;
      }
      return await checkUsername()
    },
  });
};

export {
  getUserAccount,
  useUserAccount,
  updateUserAccount,
  changeEmailAddress,
  resetPassword,
  deleteUserAccount,
  useUsernameCheck,
};
