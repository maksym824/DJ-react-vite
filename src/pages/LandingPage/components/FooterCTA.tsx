import { Flex, Text, Heading } from "@chakra-ui/react";
import StartForFreeButton from "~/components/Buttons/StartForFreeButton";

export default function FooterCTA() {
  return (
    <Flex
      flexDirection="column"
      align="center"
      justify="center"
      px="20px"
      py="40px"
      color="#fff"
      gap="15px"
      position="relative" // Add this line to position the overlay and the background image
    >
      {/* Dark Overlay */}
      <Flex
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        bg="rgba(0, 0, 0, 0.7)" // This creates a black overlay with 50% opacity
        zIndex="-1" // Makes sure the overlay is behind the content
      />

      {/* Background Image */}
      <Flex
        bgImage="url('https://djfan.ams3.cdn.digitaloceanspaces.com/2023/10/dj-home-cta.jpg')"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="center center"
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        zIndex="-2" // Makes sure the image is behind the overlay
      />

      <Heading
        fontSize="42px"
        lineHeight={{ base: "1.2em", md: "1em" }}
        textAlign="center"
      >
        Convert faceless followers into loyal supporters
      </Heading>
      <Text
        fontSize={{ base: "24px", md: "28px" }}
        lineHeight={{ base: "1.2em", md: "1em" }}
        textAlign="center"
        maxW="900px"
      >
        Use paid memberships to increase fan engagement while gaining the
        freedom and financial stability to focus on doing your best work.
      </Text>
      <StartForFreeButton />
    </Flex>
  );
}
