import {
  Box,
  HStack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

export default function FormFooter() {
  return (
    <HStack
      justifyContent="space-between"
      mt="15px"
      w={{ base: "100%", sm: "500px" }}
    >
      <HStack gap="4px">
        <FaArrowLeft fontSize="14px" />
        <Box as="a" href="/" fontWeight="500" fontSize="16px" lineHeight="1em">
          Return to Profile
        </Box>
      </HStack>

      <Menu>
        <MenuButton fontWeight="500">
          <HStack gap="6px">
            <Box fontSize="16px" lineHeight="1em">
              Change Post Type
            </Box>
            <FaEdit fontSize="18px" color="#111" />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem as="a" href="/imagepost">
            Image Post
          </MenuItem>
          <MenuItem as="a" href="/videopost">
            Video Post
          </MenuItem>
          <MenuItem as="a" href="/audiopost">
            Audio Post
          </MenuItem>
          <MenuItem as="a" href="/tourdate">
            Tour Date
          </MenuItem>
          <MenuItem as="a" href="/product">
            New Product
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
