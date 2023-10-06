import { Box, Flex, Link, Text, Center } from "@chakra-ui/react";
import Header from "../components/Header";
import { useUserAccount } from "~/services/settings/userAccount";
const boxes = [
  {
    text: "Create Post",
    imageUrl: "https://files.djfan.app/images/create.webp",
    linkUrl: "/create",
  },
  {
    text: "Create Product",
    imageUrl: "https://files.djfan.app/images/product.webp",
    linkUrl: "/product",
  },
  {
    text: "Earnings",
    imageUrl: "https://files.djfan.app/images/earnings.webp",
    linkUrl: "/earnings",
  },
  {
    text: "My Fans",
    imageUrl: "https://files.djfan.app/images/fans.webp",
    linkUrl: "/fans",
  },
  {
    text: "Settings",
    imageUrl: "https://files.djfan.app/images/settings.webp",
    linkUrl: "/settings",
  },
  {
    text: "Invitations",
    imageUrl: "https://files.djfan.app/images/invitations.webp",
    linkUrl: "/invitations",
  },
  {
    text: "Partners",
    imageUrl: "https://files.djfan.app/images/partners.webp",
    linkUrl: "/partners",
  },
];

export default function Index() {
  const { data: user } = useUserAccount();
  const isDj = user?.dj || false;
  const isAdmin = user?.admin || user?.me?.admin || false;
  const isPartner = user?.partner || user?.me?.partner || false;
  const isLoggedAs = user?.loginas || false;
  /*
  const navigate = useNavigate();
  useEffect(() => {
    if (isPartner) {
      navigate("/partners");
    }
  });
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
      <Flex w="100%" justifyContent="center">
        <Flex
          flexDirection="column"
          gap="35px"
          w="100%"
          maxW="1000px"
          pt="25px"
          px="15px"
        >
          <Flex h="100%" justifyContent="space-between" wrap="wrap" gap="30px">
            {/*
              if (box.text == "Earnings") {
                  // boxes.push('hans');
                }
                return box;
 
              */}

            {boxes
              .reduce(function (result: any[], box) {
                /*
                console.log(
                  "isDj",
                  isDj,
                  "isAdmin",
                  isAdmin,
                  "isPartner",
                  isPartner,
                  "isLoggedAs",
                  isLoggedAs
                );
                */
                if (isLoggedAs) {
                  if (!isAdmin && box.text == "Earnings") {
                    return result;
                  }
                  if (box.text == "Partners") {
                    return result;
                  }
                } else {
                  if (
                    (isPartner || isAdmin) &&
                    !isDj &&
                    box.text != "Partners"
                  ) {
                    return result;
                  }
                }
                result.push({
                  text: box.text,
                  imageUrl: box.imageUrl,
                  linkUrl: box.linkUrl,
                });
                return result;
              }, [])
              .map((box, index) => {
                console.log(box, index);
                return (
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
