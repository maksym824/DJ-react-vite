import { Flex, Text, Heading, Image, VStack } from "@chakra-ui/react";

const postTypeIcons = [
  {
    src: "https://files.djfan.app/images/9370782.png",
    name: "Text Posts",
  },
  {
    src: "https://files.djfan.app/images/imagetext.png",
    name: "Image Posts",
  },
  {
    src: "https://files.djfan.app/images/9975051.png",
    name: "Private Content",
  },
  {
    src: "https://files.djfan.app/images/9094095.png",
    name: "Gallery Posts",
  },
  {
    src: "https://files.djfan.app/images/soundcloud.png",
    name: "Embed Audio",
  },
  {
    src: "https://files.djfan.app/images/2753339.png",
    name: "Events",
  },
  {
    src: "https://files.djfan.app/images/youtube-play.png",
    name: "Embed Video",
  },
  {
    src: "https://files.djfan.app/images/2753339.png",
    name: "Tour Dates",
  },
  {
    src: "https://files.djfan.app/images/music-file.png",
    name: "Upload Audio",
  },
  {
    src: "https://files.djfan.app/images/2631012.png",
    name: "Sell Audio Files",
  },
];

export default function PostTypeIcons() {
  return (
    <Flex
      w="100%"
      bg="#111"
      py={{ base: "30px", md: "50px" }}
      justifyContent="center"
    >
      <Flex
        flexDirection={"column"}
        gap={{ base: "25px", md: "35px" }}
        maxW={{ base: "100%", md: "1100px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          fontSize={{ base: "24px", md: "32px" }}
          lineHeight="1.2em"
          color="#fff"
          textAlign={"center"}
          px="35px"
        >
          What content can you display on your creator feed?
        </Heading>

        <Flex
          w={{ base: "90%", md: "1500px" }}
          flexWrap="wrap"
          color="#fff"
          gap="25px"
          align="center"
          justifyContent={{ base: "space-around", md: "space-between" }}
        >
          {postTypeIcons.map((item) => (
            <VStack key={item.name} w={{ base: "45%", md: "16%" }} gap="20px">
              <Image src={item.src} w={{ base: "60px", md: "60px" }} />
              <Text fontSize={"20px"} fontWeight="600">
                {item.name}
              </Text>
            </VStack>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
