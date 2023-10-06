import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import FooterCTA from "./components/FooterCTA";

export default function LandingPage() {
  return (
    <Flex w="100%" h="100%" minH="100vh" flexDirection="column">
      <Box
        as="nav"
        role="navigation"
        position="sticky"
        top="0"
        zIndex="docked"
        bg="bg-accent"
      >
        <Flex
          bg="black"
          borderBottom="1px solid #ffffff"
          w="100%"
          display="flex"
          justifyContent="center"
        >
          <Flex
            maxW="1024px"
            w="100%"
            alignItems="center"
            justifyContent={"space-between"}
            px={{ base: "10px", md: "0px" }}
            py="10px"
          >
            <Image
              id="logo"
              w="120px"
              src="https://creators.djfan.app/wp-content/uploads/2023/04/djfan-email.png"
            />
            <Button
              onClick={() => {
                window.open(import.meta.env.VITE_DJFAN_SIGN_IN_URL, "_self");
              }}
            >
              SIGN IN
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box
        w="100%"
        backgroundImage="url(https://djfan.ams3.cdn.digitaloceanspaces.com/2023/07/bg-dj.jpg)"
        display="flex"
        justifyContent="center"
        px={{ base: "15px", md: "10px" }}
        py={{ base: "30px", md: "50px" }}
      >
        <Flex maxW={{ base: "100%", md: "1024px" }} alignItems="center">
          <VStack w={"100%"} gap="20px">
            <Heading
              color="white"
              fontSize={{ base: "36px", md: "58px" }}
              lineHeight="1.2em"
              maxW={{ base: "100%", md: "90%" }}
              textAlign={"center"}
            >
              Increase your income by rewarding your top fans
            </Heading>
            <Text
              color="white"
              fontWeight="500"
              fontSize={{ base: "20px", md: "24px" }}
              maxW={{ base: "100%", md: "90%" }}
              textAlign={"center"}
            >
              We provide a membership platform for DJs where they can connect
              and engage with their fans and access to tools generate a
              consistent passive income.
            </Text>
            <HStack>
              <Button
                onClick={() => {
                  window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
                }}
              >
                CREATE ACCOUNT
              </Button>
            </HStack>
          </VStack>
        </Flex>
      </Box>
      <Flex
        w="100%"
        bg="purple.600"
        px={{ base: "15px", md: "10px" }}
        py={{ base: "30px", md: "50px" }}
        justifyContent="center"
      >
        <Flex
          maxW={{ base: "100%", md: "1024px" }}
          justifyContent="center"
          alignItems="center"
        >
          <VStack w={"100%"} gap="20px">
            <Heading
              color="white"
              fontSize={{ base: "36px", md: "32px" }}
              lineHeight="1.2em"
              maxW={{ base: "100%", md: "90%" }}
              textAlign={"center"}
            >
              The creator economy is valued at{" "}
              <span
                style={{
                  padding: "0px 5px",
                  background: "cyan",
                  color: "#111",
                }}
              >
                $250 billion
              </span>{" "}
              and could double by 2027. ... will you be part of it?
            </Heading>
            <Text
              color="white"
              fontWeight="500"
              fontSize={{ base: "14px", md: "14px" }}
              maxW={{ base: "100%", md: "90%" }}
              textAlign={"center"}
            >
              Source:{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.goldmansachs.com/intelligence/pages/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027.html#:~:text=As%20the%20ecosystem%20grows%2C%20the,%24250%20billion%20today%2C%20Sheridan%20writes."
              >
                Goldman Sachs
              </a>
            </Text>
          </VStack>
        </Flex>
      </Flex>
      <FooterCTA />
      <Flex
        py="15px"
        fontSize="12px"
        justifyContent="center"
        bg="#111"
        color="#fff"
      >
        © 2023 DJfan Ltd. 1 Quality Court, Chancery Lane, London, WC2A 1HR
      </Flex>
    </Flex>
  );
}
