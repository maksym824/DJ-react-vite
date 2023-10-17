import { Box, Flex, HStack, Button } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useNavbar } from "../hooks/useNavbar";

export default function BottomTab() {
  const { rootProps } = useNavbar();
  return (
    <Box
      as="nav"
      role="navigation"
      position="sticky"
      bottom="0"
      zIndex="docked"
      bg="bg-accent"
      {...rootProps}
    >
      <Flex
        bg="black"
        borderTop="1px solid #ffffff"
        w="100%"
        display="flex"
        justifyContent="center"
      >
        <Flex
          maxW="1024px"
          w="100%"
          alignItems="center"
          justifyContent="center"
          px={{ base: "10px", md: "0px" }}
          py="10px"
        >
          <HStack gap="15px" justifyContent="center" alignItems="center">
            <Button
              ml={{ base: "0px", md: "10px" }}
              display="flex"
              alignItems="center"
              gap="4px"
              color="white"
              borderRadius="5px"
              background="transparent"
              _hover={{
                cursor: "pointer",
              }}
              border="none"
              fontWeight="600"
              onClick={() => {
                window.open("https://dj.djfan.app", "_self");
              }}
              height="35px"
            >
              <Box fontSize="32px">
                <AiOutlinePlusSquare />
              </Box>
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
