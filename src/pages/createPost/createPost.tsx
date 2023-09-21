import { Flex, Image, Link, Text, VStack } from "@chakra-ui/react";

const CreatePost = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      flexDirection="column"
      bg="#111"
      pb="50px"
    >
      <Flex w="100%" justifyContent="center">
        <Flex
          flexDirection="column"
          gap="25px"
          w="100%"
          maxW="600px"
          pt="25px"
          px="15px"
        >
          <Text
            color="#fff"
            lineHeight="1em"
            fontSize="28px"
            fontWeight="600"
            textAlign="center"
            w="100%"
          >
            Create a new post
          </Text>
          <Flex h="100%" justifyContent="space-evenly" wrap="wrap" gap="20px">
            {CTAButtons.map((box, index) => (
              <Link key={index} href={box.link} w={{ base: "45%", md: "30%" }}>
                <VStack bg="#fff" py="20px" gap="10px" borderRadius="15px">
                  <Image width="40px" src={box.imageUrl} />
                  <Text fontSize="20px" color="#111" fontWeight="600">
                    {box.name}
                  </Text>
                </VStack>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CTAButtons = [
  {
    id: 1,
    name: "Image Post",
    imageUrl: "https://media.djfan.app/images/imagepost.png",
    link: "/create/image",
  },
  {
    id: 2,
    name: "Video Post",
    imageUrl: "https://media.djfan.app/images/videopost.png",
    link: "/create/video",
  },
  {
    id: 3,
    name: "Audio Post",
    imageUrl: "https://media.djfan.app/images/audiopost.png",
    link: "/create/audio",
  },
  {
    id: 4,
    name: "Event",
    link: "/create/event",
    imageUrl: "https://media.djfan.app/images/tourdate.png",
  },
  {
    id: 5,
    name: "New Product",
    imageUrl: "https://media.djfan.app/images/product.png",
  },
  {
    id: 6,
    name: "Text Post",
    imageUrl: "https://media.djfan.app/images/textpost.png",
    link: "/create/text",
  },
];

export default CreatePost;
