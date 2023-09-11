import apiClient from "../api-client";

const updateProfilePicture = (file: File) => {
  const data = new FormData();
  data.append("image", file);
  return apiClient.post("/dj/me/profile_picture", data);
};

const updateCoverPhoto = (file: File) => {
  const data = new FormData();
  data.append("image", file);
  return apiClient.post("/dj/me/cover_photo", data);
};

export { updateProfilePicture, updateCoverPhoto };
