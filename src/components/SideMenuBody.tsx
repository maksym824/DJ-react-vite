import { Box, Stack, Divider } from "@chakra-ui/react";
import { FaHeadphones } from "react-icons/fa";

type BoxLinkProps = {
  href: string;
  text: string;
};

const BoxLink = ({ href, text }: BoxLinkProps) => (
  <Box
    as="a"
    href={href}
    display="flex"
    fontWeight="500"
    _hover={{ color: "#bf0fff" }}
  >
    {text}
  </Box>
);

const SideMenuBody = () => {
  return (
    <>
      <Box
        as="a"
        href="/profile"
        display="flex"
        alignItems="center"
        gap="5px"
        fontWeight="500"
        boxShadow="unset"
        _hover={{ bg: "#bf0fff" }}
        bg="#6b46c1"
        color="#fff"
        py="10px"
        justifyContent="center"
        _focus={{ boxShadow: "unset" }}
      >
        <FaHeadphones />
        Return to Profile
      </Box>
      <Stack px="20px" py="20px">
        <Box fontSize="18px" fontWeight="600" color="#6b46c1">
          Insights
        </Box>
        <BoxLink href="/fans" text="Your Fans" />

        <Box py="10px">
          <Divider borderColor="#6b46c1" />
        </Box>

        <Box fontSize="18px" fontWeight="600" color="#6b46c1">
          Create
        </Box>
        <BoxLink href="/imagepost" text="Image Post" />
        <BoxLink href="/videopost" text="Video Post" />
        <BoxLink href="/audiopost" text="Audio Post" />
        <BoxLink href="/tourdate" text="Tour Date" />
        <BoxLink href="/product" text="Product" />
        <BoxLink href="/textpost" text="Text Post" />

        <Box py="10px">
          <Divider borderColor="#6b46c1" />
        </Box>

        <Box fontSize="18px" fontWeight="600" color="#6b46c1">
          Income
        </Box>
        <BoxLink href="/payouts" text="Payouts" />
        <BoxLink href="/earnings" text="Earnings" />
        <BoxLink href="/invitations" text="Invitations" />

        <Box py="10px">
          <Divider borderColor="#6b46c1" />
        </Box>

        <Box fontSize="18px" fontWeight="600" color="#6b46c1">
          Settings
        </Box>
        <BoxLink href="/settings" text="Profile Information" />
        <BoxLink href="/settings" text="Account Settings" />
      </Stack>
    </>
  );
};

export default SideMenuBody;
