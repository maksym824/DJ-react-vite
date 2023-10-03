import { Box, Stack, Divider } from "@chakra-ui/react";
import { FaHeadphones } from "react-icons/fa";
import apiClient from "~/services/api-client";
import { useUserAccount } from "~/services/settings/userAccount";

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
  const { data: user } = useUserAccount();
  const isLoggedAs = user?.loginas;
  const isPartnerPageAvailable = user?.roles?.includes("ROLE_PARTNER");

  return (
    <>
      {isLoggedAs && (
        <Box
          display="flex"
          alignItems="center"
          gap="5px"
          fontWeight="500"
          boxShadow="unset"
          _hover={{ bg: "#bf0fff" }}
          bg="#123456"
          color="#fff"
          py="10px"
          justifyContent="center"
          _focus={{ boxShadow: "unset" }}
          fontSize="16px"
          cursor={isLoggedAs ? "pointer" : "not-allowed"}
          onClick={async () => {
            await apiClient.get("/dj/logoutas");
            window.location.href = "/";
          }}
        >
          Sign Out As
        </Box>
      )}
      <Box
        as="a"
        href="/settings"
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
        {isPartnerPageAvailable && (
          <BoxLink href="/partners" text="My Artists" />
        )}

        {!isPartnerPageAvailable && (
          <>
            <Box fontSize="18px" fontWeight="600" color="#6b46c1">
              Create
            </Box>
            <BoxLink href="/create/image" text="Image Post" />
            <BoxLink href="/create/video" text="Video Post" />
            <BoxLink href="/create/audio" text="Audio Post" />
            <BoxLink href="/create/event" text="Tour Date" />
            <BoxLink href="/product" text="Product" />
            <BoxLink href="/create/text" text="Text Post" />

            <Box py="10px">
              <Divider borderColor="#6b46c1" />
            </Box>

            <Box fontSize="18px" fontWeight="600" color="#6b46c1">
              Insights
            </Box>
            <BoxLink href="/fans" text="Your Fans" />

            <Box py="10px">
              <Divider borderColor="#6b46c1" />
            </Box>

            {!isLoggedAs && (
              <>
                <Box fontSize="18px" fontWeight="600" color="#6b46c1">
                  Income
                </Box>
                <BoxLink href="/payouts" text="Payouts" />
                <BoxLink href="/earnings" text="Earnings" />
              </>
            )}
            <BoxLink href="/invitations" text="Invitations" />

            <Box py="10px">
              <Divider borderColor="#6b46c1" />
            </Box>

            <Box fontSize="18px" fontWeight="600" color="#6b46c1">
              Settings
            </Box>
            <BoxLink href="/settings" text="Account" />
          </>
        )}
        <Box
          fontSize="16px"
          fontWeight="500"
          cursor="pointer"
          onClick={() => {
            window.open(import.meta.env.VITE_DJFAN_SIGN_OUT_URL, "_self");
          }}
        >
          Sign Out
        </Box>
      </Stack>
    </>
  );
};

export default SideMenuBody;
