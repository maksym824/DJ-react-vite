import {
  Flex,
  Heading,
  Link,
  Text,
  Stack,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import ConnectedAccounts from "./components/ConnectedAccounts";
import { FaLink, FaCopy } from "react-icons/fa";
import QRcode from "./components/QRcode";
import Header from "~/components/Header";

export default function Invitations() {
  const link = "https://djfan.app/invite?by=dmj";
  const toast = useToast();

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
          w="100%"
          maxW="1000px"
          pt="25px"
          px="15px"
        >
          <Flex direction="column" gap="15px">
            <Heading fontSize="24px" alignSelf="flex-start">
              Partner Link
            </Heading>
            <Flex
              bg="#ffffff"
              borderRadius="10px"
              border="2px solid #9b5de5"
              overflow="hidden"
              w="100%"
            >
              <Stack
                alignItems="flex-start"
                textAlign="left"
                gap="10px"
                height="100%"
                py="20px"
                px="20px"
              >
                <Heading fontSize="20px">Your unique invitation link: </Heading>
                <Text>
                  Simply direct DJs to sign up via this form and we will
                  automatically connect you with their account to receive
                  lifetime commissions.
                </Text>
                <Link
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  fontSize="20px"
                  _hover={{
                    color: "#5DE59A",
                  }}
                >
                  <FaLink color="#9b5de5" />
                  {link}
                </Link>
                <HStack>
                  <Button
                    rightIcon={<FaCopy />}
                    bg="#9b5de5"
                    borderWidth="0px"
                    color="#ffffff"
                    mt="10px"
                    _hover={{
                      bg: "#5DE59A",
                      color: "#ffffff",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      toast({
                        title: "Link copied to clipboard",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Copy Link
                  </Button>
                  <QRcode />
                </HStack>
              </Stack>
            </Flex>
          </Flex>
          <ConnectedAccounts />
        </Flex>
      </Flex>
    </Flex>
  );
}
