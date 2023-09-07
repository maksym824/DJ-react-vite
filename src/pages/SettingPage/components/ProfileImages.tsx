import { Flex, Avatar, Box, Image } from "@chakra-ui/react";

type Props = {
  profileImage: string;
  coverPhoto: string;
};

const ProfileImages = ({ profileImage, coverPhoto }: Props) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "20px", md: "40px" }}
    >
      <Flex direction="column" gap="10px" alignItems="flex-start">
        <Box fontSize="16px" fontWeight="600" lineHeight="1em">
          Profile Image
        </Box>
        <Avatar size="xl" src={profileImage} />
        <Box
          color="#fff"
          as="a"
          mt="5px"
          cursor="pointer"
          bg="#111"
          fontSize="10px"
          fontWeight="600"
          px="8px"
          py="6px"
          borderRadius="5px"
          lineHeight="1em"
          _hover={{ bg: "#8553f4" }}
        >
          UPDATE IMAGE
        </Box>
      </Flex>
      <Flex direction="column" gap="10px" alignItems="flex-start">
        <Box fontSize="16px" fontWeight="600" lineHeight="1em">
          Cover Photo
        </Box>
        <Image width="160px" height="96px" objectFit="cover" src={coverPhoto} />

        <Box
          color="#fff"
          as="a"
          mt="5px"
          cursor="pointer"
          bg="#111"
          fontSize="10px"
          fontWeight="600"
          px="8px"
          py="6px"
          borderRadius="5px"
          lineHeight="1em"
          _hover={{ bg: "#8553f4" }}
        >
          UPDATE IMAGE
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProfileImages;
