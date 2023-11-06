import { useState } from "react";
import {
  Box,
  ChakraProvider,
  HStack,
  Button,
  Stack,
  Flex,
  VStack,
  Step,
  Image,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Form1 } from "./components/Form1";
import { Form2 } from "./components/Form2";
import { Form3 } from "./components/Form3";
import { Form4 } from "./components/Form4";
import { Form5 } from "./components/Form5";
import { theme } from "./theme";
import { useCreateAccountContext } from "./useCreateAccountContext";
import { updateUserAccount } from "~/services/settings/userAccount";
import {
  finishSignUp,
  updateUserData,
  useUserData,
} from "~/services/settings/userData";
import SignOutBtn from "~/components/SignOutBtn";

const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

export default function CreateAccount() {
  const { refetch } = useUserData();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const steps = [
    { title: "1", description: "Names" },
    { title: "2", description: "Username" },
    { title: "3", description: "Basics" },
    { title: "4", description: "Links" },
    { title: "5", description: "Photos" },
    // Add more steps if needed
  ];
  const {
    displayName,
    firstName,
    lastName,
    username,
    shortBio,
    country,
    countryCode,
    location,
    instagram,
    soundcloud,
    website,
    profileImage,
    coverImage,
  } = useCreateAccountContext();
  const [isStepLoading, setIsStepLoading] = useState(false);
  const isStep1Complete =
    step === 1 && !!displayName && !!firstName && !!lastName;
  const isStep2Complete = step === 2 && !!username && username.length > 2;
  const isStep3Complete =
    step === 3 && !!shortBio && !!country && !!countryCode && !!location;
  const isStep4Complete =
    (step === 4 && !!instagram) || !!soundcloud || !!website;
  const isStep5Complete = step === 5 && !!profileImage && !!coverImage;

  /*
  const isStep4Complete =
    step === 4 && !!instagram && !!soundcloud && !!website;
  */

  const handleContinue = async () => {
    switch (step) {
      case 1:
        if (!isStep1Complete) break;
        setIsStepLoading(true);
        try {
          await updateUserAccount({
            first_name: firstName,
            last_name: lastName,
          });
          await updateUserData({
            display_name: displayName,
          });
          setStep(step + 1);
          setProgress(progress + 20);
        } catch (err) {
          console.log(err);
        } finally {
          setIsStepLoading(false);
        }
        break;
      case 2:
        if (!isStep2Complete) break;
        setIsStepLoading(true);
        try {
          await updateUserData({
            profile_url: username,
          });
          setStep(step + 1);
          setProgress(progress + 20);
        } catch (err) {
          console.log(err);
        } finally {
          setIsStepLoading(false);
        }
        break;
      case 3:
        if (!isStep3Complete) break;
        setIsStepLoading(true);
        try {
          await updateUserData({
            title: shortBio,
            location,
            country,
            country_code: countryCode,
          });
          setStep(step + 1);
          setProgress(progress + 20);
        } catch (err) {
          console.log(err);
        } finally {
          setIsStepLoading(false);
        }
        break;
      case 4:
        if (!isStep4Complete) break;
        setIsStepLoading(true);
        try {
          await updateUserData({
            instagram,
            soundcloud,
            website,
          });
          setStep(step + 1);
          setProgress(progress + 20);
        } catch (err) {
          console.log(err);
        } finally {
          setIsStepLoading(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)"
        minHeight="100vh"
        flexDirection="column"
      >
        <Flex
          bg="#111"
          borderBottom="1px solid #ffffff"
          w="100%"
          justifyContent="center"
          py="5px"
          position="relative"
        >
          <HStack
            maxW="1000px"
            p="10px"
            pr="15px"
            bg="#111"
            justifyContent="space-between"
          >
            <Box as="a" href="/">
              <Image
                id="logo"
                w="120px"
                src="https://media.djfan.app/images/djfan-logo-beta.png"
              />
            </Box>
          </HStack>
          <Box
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            display="flex"
            alignItems="center"
          >
            <SignOutBtn />
          </Box>
        </Flex>

        <VStack pt="20px">
          <Stack pb="10px">
            <Stepper size="sm" index={step - 1}>
              {steps.map((_, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus complete={<StepIcon />} />
                  </StepIndicator>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Stack>

          <Box
            width="100%"
            bg="#fff"
            maxWidth="400px"
            as="form"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            borderRadius="10px"
            border="solid 2px cyan"
          >
            {step === 1 ? (
              <Form1 />
            ) : step === 2 ? (
              <Form2 />
            ) : step === 3 ? (
              <Form4 />
            ) : step === 4 ? (
              <Form3 />
            ) : (
              <Form5 />
            )}

            <Box
              position="relative"
              bgColor="#111"
              p="15px"
              borderTop="2px solid cyan"
            >
              <Flex
                w="100%"
                bgColor="#111"
                justifyContent={step === 1 ? "flex-end" : "space-between"}
              >
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 20);
                  }}
                  isDisabled={step === 1}
                  bg="#fff"
                  color="#111"
                  w="7rem"
                  display={step === 1 ? "none" : "block"}
                >
                  Back
                </Button>

                {step !== 5 ? (
                  <Button
                    w="7rem"
                    isDisabled={
                      (step === 1 && !isStep1Complete) ||
                      (step === 2 && !isStep2Complete) ||
                      (step === 3 && !isStep3Complete) ||
                      (step === 4 && !isStep4Complete)
                    }
                    onClick={handleContinue}
                    bg="#fff"
                    color="#111"
                    variant="solid"
                    opacity="1"
                    isLoading={isStepLoading}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    w="7rem"
                    colorScheme="green"
                    variant="solid"
                    isDisabled={!isStep5Complete}
                    onClick={async () => {
                      try {
                        const response = await finishSignUp();
                        if (response.data?.result) {
                          toast({
                            title: "Account created.",
                            description: "We've created your account for you.",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                          });
                          await delay(1000);
                          await refetch();
                          await delay(1000);
                          window.location.href =
                            import.meta.env.VITE_DJAPP_DJ_URL;
                        }
                      } catch (err) {}
                      /*
                      finishSignUp();
                      await delay(1000);
                      await delay(1000);
                      window.location.href = "/";
                      */
                    }}
                  >
                    FINISH
                  </Button>
                )}
              </Flex>
            </Box>
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}
