import {
  Avatar,
  Box,
  Text,
  Flex,
  Skeleton,
  Center,
  Image,
  Stack,
  HStack,
  SkeletonText,
} from "@chakra-ui/react";
import { FiUnlock, FiUser, FiHeadphones } from "react-icons/fi";
export default function MobileFrame() {
  return (
    <Box
      w="350px"
      h="300px"
      p="10px 10px 0px 10px"
      borderRadius="30px 30px 0px 0px"
      boxShadow="0 0 20px #e2e2e2"
      position="relative"
      overflow="hidden"
    >
      <Center
        w="150px"
        h="20px"
        bg="white"
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        borderBottomRadius="20px"
        zIndex="5"
      >
        <Box w="60px" h="5px" bg="#f2f2f2" borderRadius="30px"></Box>
      </Center>

      <Box
        w="100%"
        h="100%"
        bg="black"
        borderRadius="30px 30px 0px 0px"
        overflow="hidden"
      >
        <Box w="100%" h="100%" zIndex="1">
          <Stack
            py="30px"
            alignItems="center"
            zIndex="4"
            position="relative"
            bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)"
          >
            <Avatar showBorder borderColor="cyan" />
            <Text
              lineHeight="1em"
              fontSize="24px"
              fontWeight="bold"
              color="white"
              mt="10px"
            >
              Richy Ahmed
            </Text>
            <HStack>
              <FiHeadphones color="#fff" />
              <Text
                lineHeight="1em"
                fontSize="16px"
                color="white"
                fontWeight="600"
              >
                DJ / Producer
              </Text>
            </HStack>
          </Stack>
          <Box padding="6" boxShadow="lg" bg="white">
            <Text>Your DJ profile</Text>
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
