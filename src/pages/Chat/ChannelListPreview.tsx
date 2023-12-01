import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Avatar,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";

const ChannelListPreview = (props: ChannelPreviewUIComponentProps) => {
  const { channel, setActiveChannel } = props;
  const { channel: activeChannel } = useChatContext();

  const selected = channel?.id === activeChannel?.id;

  const renderMessageText = () => {
    if (!channel.state.messages.length) return <span>No messages yet...</span>;
    const lastMessageText =
      channel.state.messages[channel.state.messages.length - 1].text;
    const text = lastMessageText || "message text";
    return text.length < 25 ? lastMessageText : `${text.slice(0, 25)}...`;
  };

  return (
    <Flex
      onClick={() => {
        setActiveChannel?.(channel);
      }}
      alignItems="center"
      p="2"
      borderBottom="1px solid #EFEFEF"
      backgroundColor={selected ? "#EFEFEF" : "white"}
      cursor="pointer"
    >
      <Box flexShrink={0}>
        <Avatar
          image={(channel?.data?.image ?? channel?.data?.fan_avatar) as string}
          name={
            (channel?.data?.name ??
              channel?.data?.fan_name ??
              "Channel") as string
          }
        />
      </Box>
      <Box
        ml="2"
        display={{
          base: "none",
          md: "block",
        }}
      >
        <Box>
          <Text>
            {
              (channel.data?.name ??
                channel?.data?.fan_name ??
                "Channel") as string
            }
          </Text>
          <Text>{channel.data?.subtitle}</Text>
        </Box>
        <Text>{renderMessageText()}</Text>
      </Box>
    </Flex>
  );
};

export default ChannelListPreview;
