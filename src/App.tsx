import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000,
      staleTime: 20 * 1000,
    },
  },
});

function App() {
  const streamChatClient = new StreamChat(
    import.meta.env.VITE_STREAM_CHAT_API_KEY as string
  );

  return (
    <Chat
      client={streamChatClient}
      theme="str-chat__theme-light str-custom__full-height-container"
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </Chat>
  );
}

export default App;
