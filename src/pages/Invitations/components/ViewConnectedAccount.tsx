import { Box } from "@chakra-ui/react";
import { FaHeadphones } from "react-icons/fa";
export default function ViewConnectedAccount() {
  return (
    <Box
      as="a"
      target="_blank"
      href="/profile"
      p="0"
      display="flex"
      fontSize="14px"
      bg="#ffffff"
      color="#111111"
      fontWeight="700"
      px="10px"
      py="8px"
      gap="5px"
      lineHeight="1em"
      alignItems="center"
      borderRadius="5px"
      border="1px solid #111111"
      cursor="pointer"
      _hover={{
        bg: "#9b5de5",
        color: "#ffffff",
      }}
    >
      <FaHeadphones fontSize="12px" />
      View Profile
    </Box>
  );
}
