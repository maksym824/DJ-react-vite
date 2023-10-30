import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import FanTable from "./components/FanTable";
import Header from "~/components/Header";
import { useFanList } from "~/services/fans/getFanList";
import { Fan, FanType } from "~/types";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "~/components/Loader";

export default function Fans() {
  const pageSize = 15;
  const [tabType, setTabType] = useState(FanType.ALL);
  const { data, fetchNextPage, hasNextPage, isLoading } = useFanList({
    pageSize,
    type: tabType,
  });

  const renderFanTable = () => {
    return (
      <InfiniteScroll
        dataLength={(data?.pages.length ?? 0) * pageSize}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={<Loader />}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <FanTable>
            {data?.pages.map((page) =>
              page.map((fan: Fan) => (
                <FanTable.Row key={fan.username} fan={fan} />
              ))
            )}
          </FanTable>
        )}
      </InfiniteScroll>
    );
  };

  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      flexDirection="column"
      bg="#ececec"
      pb="50px"
    >
      <Header />
      <Flex w="100%" justifyContent="center" flexDirection="column">
        <Flex
          direction="column"
          maxW="1000px"
          px={{ base: "15px", md: "25px" }}
          w="100%"
          alignSelf="center"
          gap="15px"
          pt="15px"
        >
          <Text fontSize="28px" fontWeight="bold">
            Your Fans
          </Text>
          <Tabs
            variant="unstyled"
            bg="white"
            borderRadius="5px"
            overflow="hidden"
            onChange={(index) => {
              setTabType(index as FanType);
            }}
          >
            <TabList bg="#111" color="#fff">
              <Tab {...tabStyle}>All</Tab>
              <Tab {...tabStyle}>Followers</Tab>
              <Tab {...tabStyle}>Gold</Tab>
              <Tab {...tabStyle}>VIP</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p="0">{renderFanTable()}</TabPanel>
              <TabPanel p="0">{renderFanTable()}</TabPanel>
              <TabPanel p="0">{renderFanTable()}</TabPanel>
              <TabPanel p="0">{renderFanTable()}</TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Flex>
  );
}

const tabStyle = {
  fontSize: "20px",
  fontWeight: "600",
  _selected: { color: "white", background: "#8338ec" },
};
