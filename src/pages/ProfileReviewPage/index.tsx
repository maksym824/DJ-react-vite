import { Flex, Box, Heading, Image, VStack } from "@chakra-ui/react";
import SignOutBtn from "~/components/SignOutBtn";
import { useUserData } from "~/services/settings/userData";

export default function ProfileReviewPage() {
  const { data: userData, isLoading } = useUserData();
  const isUserCompletedReview = !!userData?.profile_picture;

  if (isLoading) return <div>Loading...</div>;
  if (!isUserCompletedReview) window.location.href = "/create-account";

  return (
    <Flex w="100%" h="100%" minH="100vh" flexDirection="column">
      <Box
        as="nav"
        role="navigation"
        position="sticky"
        top="0"
        zIndex="docked"
        bg="bg-accent"
        w="100%"
      >
        <Flex
          bg="black"
          borderBottom="1px solid #ffffff"
          w="100%"
          display="flex"
        >
          <Flex
            w="100%"
            alignItems="center"
            px={{ base: "10px", md: "0px" }}
            py="10px"
            justifyContent="center"
          >
            <Image
              id="logo"
              w="120px"
              src="https://files.djfan.app/images/djfan-beta.png"
            />
          </Flex>
        </Flex>
      </Box>
      <Flex
        w="100%"
        flexGrow={1}
        bg="purple.600"
        px={{ base: "15px", md: "10px" }}
        py={{ base: "30px", md: "50px" }}
        justifyContent="center"
      >
        <Flex w="100%" justifyContent="center" alignItems="center">
          <VStack w={"100%"} gap="20px">
            <Heading
              color="white"
              fontSize={{ base: "36px", md: "32px" }}
              lineHeight="1.2em"
              maxW={{ base: "100%", md: "90%" }}
              textAlign={"center"}
            >
              Your profile is being reviewed
            </Heading>
            <SignOutBtn />
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
