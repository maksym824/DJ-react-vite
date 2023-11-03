import { AxiosProgressEvent } from "axios";
import apiClient from "./api-client";

const uploadFile = async (
  file: File,
  post_token: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const config = {
    onUploadProgress,
  };

  const fData = new FormData();
  fData.append("file", file);
  return await apiClient.post(`/dj/post/${post_token}/upload`, fData, config);
};

const uploadChunkFile = async (
  chunk: Blob,
  post_token: string,
  totalChunks: number,
  currentChunk: number,
  fileName: string
) => {
  if (!post_token) return;

  const formData = new FormData();
  formData.append("file", chunk);

  return await apiClient.post(`/dj/post/${post_token}/upload/large`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "File-Total-Chunks": totalChunks.toString(),
      "File-Chunk-Number": currentChunk.toString(),
      "File-Name": fileName,
    },
    timeout: 20000,
  });
};

export { uploadFile, uploadChunkFile };
