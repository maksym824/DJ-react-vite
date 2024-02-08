import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
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
            {/* 
            <Button
              onClick={() => {

                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: "signup_start",
                    element: "create-account-btn",
                    user_type: "dj",
                    eventTimeout: 1000,
                    eventCallback: function () {
                      window.open(
                        import.meta.env.VITE_DJFAN_SIGN_UP_URL,
                        "_self"
                      );
                    },
                  });
                } else {
                  window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
                }
              }}
            >
              CREATE ACCOUNT
            </Button>
            */}
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
