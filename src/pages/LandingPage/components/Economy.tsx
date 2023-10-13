import { Flex, Heading, Text, VStack } from "@chakra-ui/react";

const Economy = () => {
  return (
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
  );
};

export default Economy;
