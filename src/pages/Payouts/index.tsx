import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Link,
  Text,
  Stack,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaQuestionCircle,
  FaStripeS,
  FaTimes,
  FaWallet,
} from "react-icons/fa";
import PayoutHistory from "./components/PayoutHistory";
import Header from "~/components/Header";
import { useEffect, useState } from "react";
import { useUserPayout } from "~/services/payouts/getUserPayout";
import updateUserPaypalEmail from "~/services/payouts/updateUserPaypalEmail";

export default function Payouts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useUserPayout();
  const [paypalEmail, setPaypalEmail] = useState("");
  const [confirmCorrect, setConfirmCorrect] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (data?.paypal) {
      setPaypalEmail(data.paypal);
    }
  }, [data]);

  const handleUpdatePaypal = async () => {
    setIsUpdating(true);
    try {
      await updateUserPaypalEmail(paypalEmail);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

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
          px={{ base: "15px", md: "15px" }}
        >
          <Stack gap="10px">
            <Heading fontSize="30px" lineHeight="1em" alignSelf="flex-start">
              Payouts
            </Heading>
            <Text lineHeight="1em" alignSelf="flex-start">
              View and keep track of your payouts.
            </Text>
          </Stack>
          <Flex h="100%" justifyContent="space-between" wrap="wrap" gap="30px">
            <Flex
              bg="#ffffff"
              borderRadius="10px"
              overflow="hidden"
              w={{ base: "100%", md: "60%" }}
              flexDir="column"
            >
              <Flex bg="#9b5de5" px="20px" py="6px">
                <Text fontSize="18px" fontWeight="600" color="white">
                  Available for Payout
                </Text>
              </Flex>
              <Flex
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                gap="5px"
                height="100%"
                p="20px"
              >
                <Text fontWeight="600">Balance</Text>
                <Heading>${data?.available_payout ?? "0.00"}</Heading>
                <Text>
                  This is the amount you currently have in earnings, available
                  for your next payout.
                </Text>
              </Flex>
            </Flex>
            <Flex
              bg="#ffffff"
              borderRadius="10px"
              overflow="hidden"
              flexDir="column"
              w={{ base: "100%", md: "35%" }}
            >
              <Flex bg="#111111" px="20px" py="8px">
                <Text fontSize="18px" fontWeight="600" color="white">
                  Payout Account
                </Text>
              </Flex>
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap="15px"
                height="100%"
                p="20px"
              >
                <Button
                  leftIcon={<FaWallet />}
                  bg="#9b5de5"
                  borderColor="#9b5de5"
                  color="#ffffff"
                  _hover={{
                    bg: "#5DE59A",
                    color: "#ffffff",
                    borderColor: "#5DE59A",
                  }}
                >
                  WITHDRAW EARNINGS
                </Button>
                <Input
                  type="text"
                  placeholder="Enter PayPal Email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
                <HStack gap="10px">
                  <Checkbox
                    checked={confirmCorrect}
                    onChange={(e) => setConfirmCorrect(e.target.checked)}
                  />
                  <Text>My email address for payouts is correct</Text>
                </HStack>
                <Button
                  leftIcon={<FaStripeS />}
                  _hover={
                    confirmCorrect && !!paypalEmail
                      ? {
                          bg: "#111111",
                          color: "#ffffff",
                          borderColor: "#111111",
                        }
                      : {}
                  }
                  isDisabled={!confirmCorrect || !paypalEmail}
                  isLoading={isUpdating}
                  onClick={handleUpdatePaypal}
                >
                  LINK PAYPAL ACCOUNT
                </Button>
                <HStack color="#111" gap="5px">
                  <FaQuestionCircle />
                  <Link fontWeight="600" onClick={onOpen}>
                    View Tutorial
                  </Link>
                </HStack>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent mx="20px">
                    <Stack p="20px" gap="15px">
                      <Box
                        as="a"
                        position="absolute"
                        top="10px"
                        right="10px"
                        onClick={onClose}
                      >
                        <FaTimes fontSize="20px" />
                      </Box>
                      <Heading
                        fontSize={{ base: "16px", md: "20px" }}
                        lineHeight="1em"
                        textAlign="center"
                      >
                        How to connect your payout account
                      </Heading>
                      <AspectRatio width="100%" height="220px">
                        <iframe
                          title="Payout Tutorial"
                          src="https://www.youtube.com/embed/o3JKJlsGvFw"
                          allowFullScreen
                        />
                      </AspectRatio>
                      <HStack justifyContent="center" zIndex="1">
                        <Link
                          bg="#9b5de5"
                          href="/"
                          color="#ffffff"
                          fontWeight="600"
                          fontSize="14px"
                          lineHeight="1em"
                          py="8px"
                          px="10px"
                          borderRadius="5px"
                          _hover={{
                            bg: "#111111",
                          }}
                          _focus={{
                            boxShadow: "none",
                          }}
                        >
                          More Tutorials
                        </Link>
                        <Link
                          fontWeight="600"
                          fontSize="14px"
                          lineHeight="1em"
                          py="8px"
                          px="10px"
                          borderRadius="5px"
                          display="flex"
                          gap="5px"
                          href="/"
                        >
                          Contact Support
                          <FaArrowRight fontSize="12px" />
                        </Link>
                      </HStack>
                    </Stack>
                  </ModalContent>
                </Modal>
              </Flex>
            </Flex>
          </Flex>
          <Stack gap="15px">
            <Heading fontSize="24px" alignSelf="flex-start">
              Recent Payouts
            </Heading>
            <PayoutHistory payout={data?.payouts ?? []} />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}
