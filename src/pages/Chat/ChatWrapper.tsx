import { useEffect, useState } from "react";
import { StreamChat, User } from "stream-chat";
import { Chat } from "stream-chat-react";
import useUserChatToken from "~/services/getChatStreamToken";
import { useUserAccount } from "~/services/settings/userAccount";
import ChatPage from ".";
import "stream-chat-react/dist/css/v2/index.css";
import "./Chat.css";

const ChatWrapper = () => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const { data: user, isLoading: isLoadingUser } = useUserAccount();
  const { data: userChatToken, isLoading: isLoadingChatToken } =
    useUserChatToken();

  const initChat = async () => {
    const streamChatClient = new StreamChat(
      import.meta.env.VITE_STREAM_CHAT_API_KEY as string
    );
    const userStreamChat: User = {
      id: user?.user_id?.toString() as string,
      name: user?.username as string,
      image: user?.profile_url as string,
    };
    streamChatClient.connectUser(userStreamChat, userChatToken);
    setChatClient(streamChatClient);
  };

  useEffect(() => {
    if (user?.user_id && userChatToken) {
      initChat();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userChatToken]);

  if (!chatClient || isLoadingUser || isLoadingChatToken) return null;

  return (
    <Chat client={chatClient} theme="str-chat__theme-light">
      <ChatPage />
    </Chat>
  );
};

export default ChatWrapper;
