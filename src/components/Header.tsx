import {
  Box,
  Flex,
  Text,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  HStack,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import SideMenuBody from "./SideMenuBody";
import { useUserAccount } from "~/services/settings/userAccount";

const Header = () => {
  const { data: user } = useUserAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)"
        borderBottom="1px solid #ffffff"
        w="100%"
        justifyContent="center"
        py="5px"
      >
        <Flex
          w="100%"
          maxW="1000px"
          alignItems="center"
          justifyContent={"space-between"}
          p="10px"
          pr="15px"
        >
          <Flex
            w="30%"
            justifyContent="flex-start"
            display={{ base: "none", md: "flex" }}
          >
            <Flex
              as="a"
              href="/"
              color="#fff"
              lineHeight="1em"
              gap="5px"
              fontWeight="600"
              fontSize="18px"
              py="5px"
              alignItems="center"
              _hover={{ color: "cyan" }}
            >
              <FaArrowLeft fontSize="12px" />
              View Profile
            </Flex>
          </Flex>
          <Flex w="60%" justifyContent={{ base: "flex-start", md: "center" }}>
            {!user?.loginas && (
              <Box as="a" href="/">
                <Image
                  id="logo"
                  w="120px"
                  src="https://media.djfan.app/images/djfan-logo-beta.png"
                />
              </Box>
            )}
            {user?.loginas && (
              <Text fontSize="16" color="#FFF" paddingLeft={5}>
                {user?.username && user?.username.toString().substring(0, 28)}
              </Text>
            )}
          </Flex>
          <Flex w="30%" justifyContent="flex-end">
            <Box as="a" onClick={onOpen} color="#fff" cursor="pointer">
              <Icon
                viewBox="0 0 24 24"
                width="30px"
                height="30px"
                color="white"
                _hover={{ width: "35px", height: "35px" }}
                transition="all 0.3s ease-in-out"
              >
                <path
                  fill="currentColor"
                  d="M0,4c0-.55,.45-1,1-1H18c.55,0,1,.45,1,1s-.45,1-1,1H1c-.55,0-1-.45-1-1Zm18,15H1c-.55,0-1,.45-1,1s.45,1,1,1H18c.55,0,1-.45,1-1s-.45-1-1-1Zm5-8H6c-.55,0-1,.45-1,1s.45,1,1,1H23c.55,0,1-.45,1-1s-.45-1-1-1Z"
                />
              </Icon>
            </Box>
          </Flex>

          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
              p="0"
              maxW={{ base: "50%", md: "220px" }}
              id="content"
            >
              <DrawerBody p="0">
                <HStack bg="#111" p="15px" justifyContent="space-between">
                  <Box color="#fff" fontWeight="600" fontSize="18px">
                    Creator Menu
                  </Box>
                  <Box
                    as="a"
                    href=""
                    onClick={onClose}
                    right="15px"
                    top="15px"
                    cursor="pointer"
                    color="#fff"
                    _hover={{ color: "#5c03bc" }}
                  >
                    <FaTimes fontSize="18px" />
                  </Box>
                </HStack>
                <SideMenuBody />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
