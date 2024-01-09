import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

// x
export default function DemoConfirmation() {
  return (
    <Flex flexDirection="column" minH="100vh" bg="pink">
      <Flex
        bg="black"
        borderBottom="1px solid #ffffff"
        w="100%"
        display="flex"
        justifyContent="center"
        p="10px"
      >
        <Box as="a" href="https://dj.djfan.app">
          <Image
            id="logo"
            w="120px"
            src="https://files.djfan.app/images/djfan-beta.png"
          />
        </Box>
      </Flex>
      <Flex
        pt="80px"
        alignItems="center"
        flexGrow="1"
        flexDirection="column"
        id="pagecontent"
        bgImage={
          "linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)) ,url(http://files.djfan.app/images/demo-background.webp)"
        }
        bgSize="cover"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          bg="white"
          w={{ base: "90%", md: "500px" }}
          rounded="lg"
          px={{ base: "10px", md: "20px" }}
          textAlign="center"
          py={{ base: "20px" }}
        >
          <Image
            src="http://media.djfan.app/images/calendar-1.png"
            width="60px"
            mb="10px"
          />
          <Heading fontSize={{ base: "22px", md: "28px" }} mb="5px">
            Platform Demo Booked
          </Heading>
          <Text
            fontSize={{ base: "16px", md: "18px" }}
            lineHeight="1.4em"
            mb="5px"
          >
            Please check your email for booking confirmation and a calendar
            invitation with Google Meet link.
          </Text>
          <Text fontSize={{ base: "12px", md: "18px" }}>
            If you need to cancel or reschedule please click the links within
            the confirmation email.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
