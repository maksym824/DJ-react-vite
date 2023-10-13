import { Flex, Box, Button, Image } from "@chakra-ui/react";
import FooterCTA from "./components/FooterCTA";
import PostTypeIcons from "./components/PostTypeIcons";
import FeatureCards from "./components/FeatureCards";
import CreateAccountSection from "./components/CreateAccount";
import Economy from "./components/Economy";
import EarningsCalculator from "./components/calculator";

export default function LandingPage() {
  return (
    <Flex w="100%" h="100%" minH="100vh" flexDirection="column">
      <Box
        as="nav"
        role="navigation"
        position="sticky"
        top="0"
        zIndex="docked"
        bg="bg-accent"
      >
        <Flex
          bg="black"
          borderBottom="1px solid #ffffff"
          w="100%"
          display="flex"
          justifyContent="center"
        >
          <Flex
            maxW="1024px"
            w="100%"
            alignItems="center"
            justifyContent={"space-between"}
            px={{ base: "10px", md: "0px" }}
            py="10px"
          >
            <Image
              id="logo"
              w="120px"
              src="https://creators.djfan.app/wp-content/uploads/2023/04/djfan-email.png"
            />
            <Button
              onClick={() => {
                window.open(import.meta.env.VITE_DJFAN_SIGN_IN_URL, "_self");
              }}
            >
              SIGN IN
            </Button>
          </Flex>
        </Flex>
      </Box>
      <CreateAccountSection />
      <EarningsCalculator />
      <FeatureCards />
      <PostTypeIcons />
      <Economy />
      <FooterCTA />
      <Flex
        py="15px"
        fontSize="12px"
        justifyContent="center"
        bg="#111"
        color="#fff"
      >
        © 2023 DJfan Ltd. 1 Quality Court, Chancery Lane, London, WC2A 1HR
      </Flex>
    </Flex>
  );
}
