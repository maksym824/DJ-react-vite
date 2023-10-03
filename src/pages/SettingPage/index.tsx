import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Header from "~/components/Header";
import ProfileLinks from "./components/ProfileLinks";
import ProfileSettings from "./components/ProfileSettings";
import AccountSettings from "./components/AccountSettings";
import { useUserAccount } from "~/services/settings/userAccount";

const tabStyle = {
  fontSize: { base: "20px", md: "16px" },
};

const hiddenWord = {
  display: { base: "none", md: "unset" },
};

export default function Settings() {
  const { data: user } = useUserAccount();
  const isLoggedAs = user?.loginas;
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
      <Flex w="100%" flexDirection="column" alignItems="center">
        <Tabs
          pt="15px"
          variant="soft-rounded"
          colorScheme="green"
          w={{ base: "100%", sm: "800px" }}
          px={{ base: "10px", sm: "20px" }}
        >
          <Box bg="white" px="10px" py="10px" borderRadius="10px">
            <TabList>
              <Tab {...tabStyle}>
                Profile
                <Box {...hiddenWord}>&nbsp;Settings</Box>
              </Tab>
              <Tab {...tabStyle}>
                <Box {...hiddenWord}>Profile&nbsp;</Box> Links
              </Tab>
              {!isLoggedAs && (
                <Tab {...tabStyle}>
                  Account <Box {...hiddenWord}>&nbsp;Settings</Box>
                </Tab>
              )}
            </TabList>
          </Box>
          <TabPanels>
            <TabPanel p="0">
              <ProfileSettings />
            </TabPanel>
            <TabPanel p="0">
              <ProfileLinks />
            </TabPanel>
            {!isLoggedAs && (
              <TabPanel p="0">
                <AccountSettings />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
