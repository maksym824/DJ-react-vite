import { io } from "socket.io-client";

const URL = import.meta.env.VITE_DJAPP_API_URL;
// const URL = "https://dev-apidj.djfan.app";

export const socket = io(URL as string, {
  autoConnect: false,
});
