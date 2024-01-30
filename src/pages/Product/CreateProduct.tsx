import { useEffect, useState } from "react";
import {
  Flex,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Header from "~/components/Header";
import getPostToken from "~/services/getPostToken";
import { PostType } from "~/types";
import ProductTrackTab from "./components/ProductTrackTab";
import { FaFile, FaHeadphones, FaMusic, FaVideo } from "react-icons/fa";
import ProductVideoTab from "./components/ProductVideoTab";

enum ProductTab {
  TRACK = 0,
  VIDEO = 1,
  FILE = 2,
  PODCAST = 3,
}

const CreateProductPage = () => {
  const [postToken, setPostToken] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<ProductTab>(ProductTab.TRACK);

  const handleInitPostToken = async () => {
    const token = await getPostToken(PostType.product);
    setPostToken(token as string);
  };

  useEffect(() => {
    handleInitPostToken();
  }, []);

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
      <Flex
        w="100%"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Flex
          flexDirection="column"
          gap="35px"
          w="100%"
          maxW="1000px"
          pt="25px"
          px="15px"
          alignItems="center"
        >
          <Flex
            gap="10px"
            bg="#fff"
            flexDirection="column"
            w={{ base: "100%", sm: "500px" }}
            borderRadius="10px"
            overflow="hidden"
          >
            <Flex background="#300a6e" justifyContent="center">
              <Heading
                color="#fff"
                fontSize="20px"
                display="flex"
                alignItems="center"
                gap="6px"
                py="15px"
              >
                Create Product
              </Heading>
            </Flex>
            <Tabs
              defaultIndex={selectedTab}
              onChange={(index) => setSelectedTab(index)}
            >
              <TabList>
                <Tab fontWeight="bold">
                  <HStack>
                    <FaMusic />
                    <Text>Track</Text>
                  </HStack>
                </Tab>
                <Tab fontWeight="bold">
                  <HStack>
                    <FaVideo />
                    <Text>Video</Text>
                  </HStack>
                </Tab>
                <Tab fontWeight="bold">
                  <HStack>
                    <FaFile />
                    <Text>File</Text>
                  </HStack>
                </Tab>
                <Tab fontWeight="bold">
                  <HStack>
                    <FaHeadphones />
                    <Text>Podcast</Text>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ProductTrackTab postToken={postToken} />
                </TabPanel>
                <TabPanel>
                  <ProductVideoTab postToken={postToken} />
                </TabPanel>
                <TabPanel>
                  <ProductTrackTab postToken={postToken} />
                </TabPanel>
                <TabPanel>
                  <ProductTrackTab postToken={postToken} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateProductPage;
