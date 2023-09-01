import { AxiosProgressEvent } from "axios";
import apiClient from "./api-client";

const uploadFile = async (
  file: File,
  post_token: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  if (!post_token) return;

  const config = {
    onUploadProgress,
  };

  const fData = new FormData();
  fData.append("file", file);
  return await apiClient.post(`/dj/post/${post_token}/upload`, fData, config);
};

const uploadLargeFile = async (
  file: File,
  post_token: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  if (!post_token) return;

  const config = {
    onUploadProgress,
  };

  const fData = new FormData();
  fData.append("file", file);
  return await apiClient.post(
    `/dj/post/${post_token}/upload/large`,
    fData,
    config
  );
};

export { uploadFile, uploadLargeFile };
