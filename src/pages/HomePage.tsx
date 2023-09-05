import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { FaImages, FaMusic, FaVideo } from "react-icons/fa";
import { MdOutlineEditCalendar } from "react-icons/md";
import { TbShoppingCartPlus, TbNews } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const CTAButtons = [
  {
    id: 1,
    name: "Image Post",
    icon: <FaImages />,
    link: "/create/image",
  },
  {
    id: 2,
    name: "Video Post",
    icon: <FaVideo />,
    link: "/create/video",
  },
  {
    id: 3,
    name: "Audio Post",
    icon: <FaMusic />,
    link: "/create/audio",
  },
  {
    id: 4,
    name: "Tour Date",
    icon: <MdOutlineEditCalendar />,
  },
  {
    id: 5,
    name: "New Product",
    icon: <TbShoppingCartPlus />,
  },
  {
    id: 6,
    name: "Text Post",
    icon: <TbNews />,
    link: "/create/text",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box bg="black" height="100%">
      <Box textAlign="center" py={6}>
        <Text color="white" fontWeight="bold" fontSize={"24px"}>
          Create a new post
        </Text>
      </Box>
      <SimpleGrid columns={2} px={6} gap={6}>
        {CTAButtons.map((button) => (
          <Flex
            key={button.id}
            bg="white"
            borderRadius="5px"
            alignItems={"center"}
            flexDirection={"column"}
            p={3}
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              if (button.link) {
                navigate(button.link);
              }
            }}
          >
            <Box fontSize={"40px"}>{button.icon}</Box>
            <Text mt={3}>{button.name}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
