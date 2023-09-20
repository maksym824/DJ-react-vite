import { Box, Flex, Link, Text, Center } from "@chakra-ui/react";
import Header from "../components/Header";
const boxes = [
  {
    text: "Create Post",
    imageUrl: "https://media.djfan.app/images/create.jpg",
    linkUrl: "/create",
  },
  {
    text: "Create Product",
    imageUrl: "https://media.djfan.app/images/product.jpg",
    // linkUrl: "/product",
  },
  {
    text: "Earnings",
    imageUrl: "https://media.djfan.app/images/earnings.jpg",
    linkUrl: "/earnings",
  },
  {
    text: "My Fans",
    imageUrl: "https://media.djfan.app/images/fans.jpg",
    linkUrl: "/fans",
  },
  {
    text: "Settings",
    imageUrl: "https://media.djfan.app/images/settings.jpg",
    linkUrl: "/settings",
  },
  {
    text: "Invitations",
    imageUrl: "https://media.djfan.app/images/invitations.jpg",
    // linkUrl: "/invitations",
  },
];
export default function Index() {
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
          <Flex h="100%" justifyContent="space-between" wrap="wrap" gap="30px">
            {boxes.map((box, index) => (
              <Link
                key={index}
                href={box?.linkUrl ?? "/"}
                w={{ base: "100%", md: "30%" }}
              >
                <Box
                  w={{ base: "100%", md: "100%" }}
                  h="150px"
                  bgImage={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${box.imageUrl})`}
                  bgPos="center"
                  bgSize="cover"
                  borderRadius="10px"
                  position="relative"
                >
                  <Center h="100%">
                    <Text fontSize="24px" color="white" fontWeight="600">
                      {box.text}
                    </Text>
                  </Center>
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
