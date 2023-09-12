import {
  Flex,
  Heading,
  Text,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import SubscriberStats from "./stats/SubscribersStats";
import Earnings30 from "./stats/Earnings30";
import Earnings365 from "./stats/Earnings365";
import EarningsAllTime from "./stats/EarningsAllTime";
import Header from "~/components/Header";
import { useUserStatistics } from "~/services/earnings/getUserStatistics";

export default function Earnings() {
  const { data } = useUserStatistics();

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
      <Flex w="100%" justifyContent="center">
        <Flex
          flexDirection="column"
          gap="35px"
          maxW="1000px"
          w="100%"
          pt="25px"
          px="15px"
        >
          <Flex flexDirection="column" gap="20px">
            <Stack gap="10px">
              <Heading fontSize="30px" lineHeight="1em" alignSelf="flex-start">
                Statistics
              </Heading>
              <Text lineHeight="1em" alignSelf="flex-start">
                Here are your statistics at a glance...
              </Text>
            </Stack>
            <SubscriberStats
              members={(data?.gold ?? 0) + (data?.vip ?? 0)}
              followers={data?.followers ?? 0}
              monthlyIncome={data?.monthly_income ?? 0}
            />
          </Flex>
          <Flex flexDirection="column" gap="15px">
            <Heading fontSize="30px" lineHeight="1em" alignSelf="flex-start">
              Earnings
            </Heading>
            <Tabs variant="soft-rounded" colorScheme="green" w="100%">
              <TabList>
                <Tab p="5px" px="10px">
                  Last 30 Days
                </Tab>
                <Tab p="5px" px="10px">
                  Last 365 Days
                </Tab>
                <Tab p="5px" px="10px">
                  All Time
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel p="0" pt="20px">
                  <Earnings30
                    membership={data?.subscription_last_30_days ?? 0}
                    product={data?.products_last_30_days ?? 0}
                    total={data?.total_last_30_days ?? 0}
                  />
                </TabPanel>
                <TabPanel p="0" pt="20px">
                  <Earnings365
                    membership={data?.subscription_last_365_days ?? 0}
                    product={data?.products_last_365_days ?? 0}
                    total={data?.total_last_365_days ?? 0}
                  />
                </TabPanel>
                <TabPanel p="0" pt="20px">
                  <EarningsAllTime
                    membership={data?.subscription_last_all_days ?? 0}
                    product={data?.products_last_all_days ?? 0}
                    total={data?.total_last_all_days ?? 0}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
