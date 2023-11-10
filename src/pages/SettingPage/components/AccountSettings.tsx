import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Divider,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Flex,
  Text,
  HStack,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  changeEmailAddress,
  deleteUserAccount,
  resetPassword,
  updateUserAccount,
  useUserAccount,
} from "~/services/settings/userAccount";
import { BiEnvelope, BiKey, BiUser } from "react-icons/bi";
import { FaArrowRight, FaStripeS } from "react-icons/fa";
import updateUserPaypalEmail from "~/services/payouts/updateUserPaypalEmail";
// import { useUserData } from "~/services/settings/userData";

export default function AccountSettings() {
  const { data, refetch } = useUserAccount();
  // const { data: userData } = useUserData();

  const isLoggedAs = data?.loginas;

  // const paypal = data?.paypal; // userData ?? {};
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [paypalEmail, setPaypalEmail] = useState<string>("");
  // const [paypalEmail, setPaypalEmail] = useState("");

  // const [newEmail, setNewEmail] = useState<string>("");
  // const [confirmEmail, setConfirmEmail] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [confirmCorrect, setConfirmCorrect] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFirstName(data?.first_name ?? "");
    setLastName(data?.last_name ?? "");
    setPaypalEmail(data?.paypal ?? "");
  }, [data]);

  /*
  useEffect(() => {
    if (paypal) {
      setPaypalEmail(paypal);
    }
  }, [paypal]);
  */

  const handleUpdateAccount = async () => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
    };
    setIsLoading(true);
    try {
      const res = await updateUserAccount(payload);
      if (res.data?.result) {
        await refetch();
        toast({
          description: "Successfully saved",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmailAddress = async () => {
    try {
      await changeEmailAddress();
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAccount = async function () {
    try {
      await deleteUserAccount();
      // if (res.data.result) {
      //   window.open("https://fan.djfan.app", "_self");
      // } else {
      //   console.log("delete account failed! ");
      // }
    } catch (e) {
      return null;
    }
  };

  const handleUpdatePaypal = async () => {
    setIsUpdating(true);
    try {
      await updateUserPaypalEmail(paypalEmail);
      toast({
        description: "Successfully saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    !isLoggedAs && (
      <>
        <Stack p="20px" bg="#fff" mt="20px" borderRadius="10px">
          <FormControl mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              placeholder=" First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>

          {/* <FormControl mb={4}>
          <FormLabel>New Email Address</FormLabel>
          <Input
            type="text"
            placeholder="Enter only username (no link)"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Confirm Email Address</FormLabel>
          <Input
            type="text"
            placeholder="Enter only username (no link)"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </FormControl> */}

          <Button
            type="submit"
            background="#300a6e"
            color="#fff"
            fontSize="18px"
            _hover={{ background: "#111" }}
            height="45px"
            onClick={handleUpdateAccount}
            isLoading={isLoading}
          >
            UPDATE PROFILE <FaArrowRight style={{ marginLeft: "5px" }} />
          </Button>
          <Divider paddingBottom="6px" paddingTop="6px"></Divider>
          <Flex
            flexDirection="column"
            justifyContent="center"
            gap="15px"
            mt="15px"
            height="100%"
          >
            <FormControl>
              <FormLabel>Paypal Email</FormLabel>
              <Input
                type="text"
                placeholder="Enter PayPal Email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
              />
            </FormControl>
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
          </Flex>

          <Divider paddingBottom="6px" paddingTop="6px"></Divider>

          <Button
            w="100%"
            colorScheme="pink"
            bgColor="rgb(191, 40, 241)"
            color="#fff"
            onClick={handleChangeEmailAddress}
          >
            <BiEnvelope /> Change Email Address
          </Button>
          <Divider paddingBottom="6px" paddingTop="6px"></Divider>

          <Button
            w="100%"
            colorScheme="pink"
            bgColor="rgb(191, 40, 241)"
            color="#fff"
            onClick={handleResetPassword}
          >
            <BiKey /> Reset Password
          </Button>

          <Divider paddingBottom="6px" paddingTop="6px"></Divider>

          <Button w="100%" color="#fff" colorScheme="red" onClick={onOpen}>
            <BiUser /> Delete My Account
          </Button>
        </Stack>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete My Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete your account? You can't undo
                this action afterwards. All subscriptions will be cancelled
                automaticly on deletion.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    deleteAccount();
                    onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  );
}
