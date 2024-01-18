import {
  Box,
  Flex,
  Link,
  Text,
  Center,
  Stack,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { useUserAccount } from "~/services/settings/userAccount";
import { useUserData } from "~/services/settings/userData";

type BoxItem = {
  id: number;
  text: string;
  imageUrl: string;
  linkUrl: string;
};

const boxes: BoxItem[] = [
  {
    id: 1,
    text: "Post",
    imageUrl: "https://files.djfan.app/images/create.webp",
    linkUrl: "/create",
  },
  {
    id: 2,
    text: "Product",
    imageUrl: "https://files.djfan.app/images/product.webp",
    linkUrl: "/product",
  },
  {
    id: 5,
    text: "My page", // My djfan page - Dummy
    imageUrl: "https://files.djfan.app/images/mydjfan-new.webp",
    linkUrl: "",
  },
  {
    id: 4,
    text: "My Fans",
    imageUrl: "https://files.djfan.app/images/fans.webp",
    linkUrl: "/fans",
  },
  {
    id: 3,
    text: "Earnings",
    imageUrl: "https://files.djfan.app/images/earnings.webp",
    linkUrl: "/earnings",
  },
  {
    id: 6,
    text: "Settings",
    imageUrl: "https://files.djfan.app/images/settings.webp",
    linkUrl: "/settings",
  },
  {
    id: 7,
    text: "Invitations",
    imageUrl: "https://files.djfan.app/images/invitations.webp",
    linkUrl: "/invitations",
  },
  {
    id: 8,
    text: "Chat",
    imageUrl: "https://files.djfan.app/images/mydjfan-new.webp",
    linkUrl: "/chat",
  },
  {
    id: 9,
    text: "Partners",
    imageUrl: "https://files.djfan.app/images/partners.webp",
    linkUrl: "/partners",
  },
];

export default function Index() {
  const { data: user } = useUserAccount();
  const { data: details } = useUserData();
  const isDj = user?.dj || false;
  const isAdmin = user?.admin || user?.me?.admin || false;
  const isPartner = user?.partner || user?.me?.partner || false;
  const isLoggedAs = user?.loginas || false;
  /*
  (window as any).kompassifyLaunchTour(
    "152bb8e4-dfdd-41cf-aeaf-29d76f4978ee",
    0,
    true
  );
  */

  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      flexDirection="column"
      bg="#ececec"
      pb="50px"
    >
      <Header />
      <Stack
        w="100%"
        py="30px"
        alignItems="center"
        position="relative"
        bgImage={details?.cover_photo}
        bgSize="cover"
        bgColor="grey"
        bgRepeat="no-repeat"
        bgPos="center"
        opacity="0.7"
        px={{
          base: "15px",
          md: "0px",
        }}
      >
        <VStack position="relative">
          <Avatar
            bg="black"
            src={details?.profile_picture}
            showBorder
            borderColor="cyan"
            size="lg"
          />
          <Text fontSize="24px" color="white" fontWeight="600">
            {details?.display_name ?? ""}
          </Text>
          <Text
            color="white"
            textAlign="center"
            w={{
              base: "100%",
              md: "40%",
            }}
            dangerouslySetInnerHTML={{
              __html: details?.about_me ?? "",
            }}
          ></Text>
        </VStack>
      </Stack>
      <Flex w="100%" justifyContent="center">
        <Flex
          flexDirection="column"
          gap="20px"
          w="100%"
          maxW="1000px"
          pt="25px"
          px="15px"
        >
          <Flex h="100%" justifyContent="space-between" wrap="wrap" gap="20px">
            {boxes
              .reduce(function (result: BoxItem[], box) {
                if (box.id == 5) {
                  box.linkUrl =
                    import.meta.env.VITE_DJAPP_FAN_URL +
                    "/artists/" +
                    user?.profile_url;
                }
                if (isLoggedAs) {
                  if (!isAdmin && box.id == 3) {
                    return result;
                  }
                  if (box.id == 8) {
                    return result;
                  }
                } else {
                  // partner only
                  if (isPartner && !isDj) {
                    if ([1, 2, 4, 5, 8].includes(box.id)) {
                      return result;
                    }
                  }
                  // partner and dj
                  if (isPartner && isDj) {
                    // do sth
                  }
                  // dj only
                  if (!isPartner && isDj) {
                    if ([9].includes(box.id)) {
                      return result;
                    }
                  }
                }
                result.push({
                  id: box.id,
                  text: box.text,
                  imageUrl: box.imageUrl,
                  linkUrl: box.linkUrl,
                });
                return result;
              }, [])
              .map((box, index) => {
                return (
                  <Link
                    isExternal={box?.id == 5 ? true : false}
                    key={index}
                    href={box?.linkUrl ?? "/"}
                    /* w={{ base: "100%", md: "30%" }} */
                    w={{ base: "45%", md: "30%" }}
                  >
                    <Box
                      w={{ base: "100%", md: "100%" }}
                      h="150px"
                      bgImage={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${box.imageUrl})`}
                      bgPos="center"
                      bgSize="cover"
                      borderRadius="10px"
                      position="relative"
                      backgroundColor="#000"
                    >
                      <Center h="100%">
                        <Text fontSize="24px" color="white" fontWeight="600">
                          {box.text}
                        </Text>
                      </Center>
                    </Box>
                  </Link>
                );
              })}

            {/*
              {boxes.map((box, index) =>
                !isAdmin && isLoggedAs && box.text == "Earnings" ? (
                  <></>
                ) : (
                  <Link
                    key={index}
                    href={box?.linkUrl ?? "/"}
                    w={{ base: "100%", md: "30%" }}
                  >
                    <Box
                      w={{ base: "100%", md: "100%" }}
                      h="150px"
                      bgImage={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${box.imageUrl})`}
                      bgPos="center"
                      bgSize="cover"
                      borderRadius="10px"
                      position="relative"
                    >
                      <Center h="100%">
                        <Text fontSize="24px" color="white" fontWeight="600">
                          {box.text}
                        </Text>
                      </Center>
                    </Box>
                  </Link>
                )
              )}
              */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
