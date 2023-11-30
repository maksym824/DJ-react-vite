import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AscDesc, ChannelFilters, Channel as IChannel } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
  useChatContext,
} from "stream-chat-react";
import Header from "~/components/Header";
import getDJDMChannels from "~/services/getDJDMChannels";
import { useUserData } from "~/services/settings/userData";
import ChannelListPreview from "./ChannelListPreview";

interface ChannelData {
  channel_id: string;
  message_count: number;
}

const sort = [{ last_message_at: -1 as AscDesc }];

const ChatPage = () => {
  const { data: userData } = useUserData();
  const { client, channel: activeChannel } = useChatContext();
  const [channel, setChannel] = useState<IChannel>();
  const [loading, setLoading] = useState(true);
  const [dmChannelFilters, setDMChannelFilters] = useState<ChannelFilters>();

  const initChannel = async () => {
    const filter = {
      type: "messaging",
      id: { $in: [userData?.user_id?.toString() ?? ""] },
    } as ChannelFilters;
    try {
      const channels = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
      setChannel(channels[0]); // for community channel

      const dmChannelList: ChannelData[] = await getDJDMChannels();
      // for filtering the DM channels
      const dmChannelFilter = {
        type: "messaging",
        $or: [
          {
            id: {
              $in: dmChannelList.map((x) => x.channel_id),
            },
          },
          {
            id: {
              $in: [userData?.user_id?.toString() ?? ""],
            },
          },
        ],
        members: {
          $in: [userData?.user_id?.toString() ?? ""],
        },
      } as ChannelFilters;
      setDMChannelFilters(dmChannelFilter);
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
    <Flex direction="column" h="100vh">
      <Header />
      <Flex h="100%">
        <ChannelList
          sort={sort}
          filters={dmChannelFilters}
          Preview={ChannelListPreview}
        />
        <Channel channel={activeChannel ?? channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput grow={true} />
          </Window>
        </Channel>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
