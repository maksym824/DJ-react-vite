import { Box, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import CreateAccountButton from "~/components/Buttons/CreateAccountButton";
import PartnerProgramButton from "~/components/Buttons/PartnerProgramButton";

const CreateAccountSection = () => {
  return (
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
            We give you all the tools to engage & grow your audience. Get paid
            with subscriptions, products, and more.
          </Text>
          <HStack>
            <CreateAccountButton />
          </HStack>
          <HStack gap="15px">
            <PartnerProgramButton />
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CreateAccountSection;
