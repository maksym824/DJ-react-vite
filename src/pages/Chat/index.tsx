import { useEffect, useState } from "react";
import { AscDesc } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
  useChatContext,
} from "stream-chat-react";
import { useUserData } from "~/services/settings/userData";

const ChatPage = () => {
  const { data: userData } = useUserData();
  const { client } = useChatContext();
  // eslint-disable-next-line
  const [channel, setChannel] = useState<any>();
  const [loading, setLoading] = useState(true);

  const initChannel = async () => {
    const filter = {
      type: "messaging",
      id: { $in: [userData?.user_id?.toString() ?? ""] },
    };
    const sort = [{ last_message_at: -1 as AscDesc }];
    try {
      const channels = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
      setChannel(channels[0]);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.user_id && userData?.display_name) {
      initChannel();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (!client || loading) {
    return <LoadingIndicator />;
  }

  return (
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  );
};

export default ChatPage;
