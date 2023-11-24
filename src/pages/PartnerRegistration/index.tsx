import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Heading,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  InputRightElement,
  Image,
  HStack,
  Select,
  FormErrorMessage,
  VStack,
  useToast,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  HiPhone,
  HiMail,
  HiLockClosed,
  HiOfficeBuilding,
  HiUser,
  HiEye,
  HiEyeOff,
  HiArrowRight,
} from "react-icons/hi";
import {
  PartnerRegistrationPayload,
  createPartner,
} from "~/services/partners/partnerRegistration";

enum DJCount {
  oneToFive = "1-5",
  fileToFifteen = "5-15",
  fifteenToThirty = "15-30",
  thirtyToFifty = "30-50",
  fiftyPlus = ">50",
}

const DJCountOptions = [
  {
    value: DJCount.oneToFive,
    label: "1-5",
  },
  {
    value: DJCount.fileToFifteen,
    label: "5-15",
  },
  {
    value: DJCount.fifteenToThirty,
    label: "15-30",
  },
  {
    value: DJCount.thirtyToFifty,
    label: "30-50",
  },
  {
    value: DJCount.fiftyPlus,
    label: ">50",
  },
];

// const SUCCESS_REDIRECT_URL = "https://auth.djfan.app/auth/signinpartner";
const SUCCESS_REDIRECT_URL = "/";

export default function PartnerRegistration() {
  const [partnerType, setPartnerType] = useState("");
  const [djCount, setDJCount] = useState(DJCount.oneToFive);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailCreds, setEmailCreds] = useState("");
  const [confirmEmailCreds, setConfirmEmailCreds] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordCreds, setPasswordCreds] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordCreds, setConfirmPasswordCreds] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [termAccepted, setTermAccepted] = useState(false);

  const isPasswordValid = passwordCreds.length >= 8;
  const isConfirmPasswordValid = passwordCreds === confirmPasswordCreds;
  const isEmailValid =
    emailCreds.length > 0 &&
    confirmEmailCreds.length > 0 &&
    emailCreds === confirmEmailCreds;

  const isFormValid = () => {
    return (
      partnerType.length > 0 &&
      djCount.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      emailCreds.length > 0 &&
      confirmEmailCreds.length > 0 &&
      company.length > 0 &&
      phone.length > 0 &&
      passwordCreds.length > 0 &&
      confirmPasswordCreds.length > 0 &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isEmailValid
    );
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const payload: PartnerRegistrationPayload = {
      partner_type: partnerType,
      dj_count: djCount,
      first_name: firstName,
      last_name: lastName,
      email: emailCreds,
      company,
      phone,
      password: passwordCreds,
      re_email: confirmEmailCreds,
      re_password: confirmPasswordCreds,
    };
    setIsLoading(true);
    try {
      const res = await createPartner(payload);
      const { data } = res;
      if (data.result) {
        toast({
          title: "Success",
          description: "Partner account created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = SUCCESS_REDIRECT_URL;
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: data?.message ?? "Partner account creation failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log("err", err);
      setIsLoading(false);
    }
  };

  return (
    <Flex w="100%" bg="#111111" minH="100vh" flexDirection="column" pb="80px">
      <Flex
        w="100%"
        bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)"
        borderBottom="1px solid #ffffff"
        gap="10px"
        py="10px"
        justifyContent="center"
      >
        <Box as="a" href="https://djfan.app">
          <Image
            id="logo"
            w="120px"
            src="https://media.djfan.app/images/djfan-logo-beta.png"
          />
        </Box>
      </Flex>
      <VStack pt="30px">
        <Stack spacing="30px" color="white" w={{ base: "100%", md: "400px" }}>
          <Stack spacing="2">
            <Heading
              textAlign="center"
              fontSize={useBreakpointValue({ base: "26px", md: "30px" })}
            >
              Become a Partner
            </Heading>
            <Box textAlign="center" fontSize="18px" px="15px">
              Refer creators receive{" "}
              <Box display="inline" fontWeight="600" color="cyan">
                5% commission
              </Box>{" "}
              on the DJfan earnings of each artist.
            </Box>
          </Stack>

          <Stack w="100%" px={{ base: "25px", md: "15px" }} as="form">
            <Stack spacing="15px">
              <FormControl>
                <FormLabel htmlFor="partnerType" fontSize="16px">
                  What describes you best?
                </FormLabel>
                <Select
                  id="partnerType"
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                >
                  <option style={{ background: "#000" }}>Please choose</option>
                  <option value="agent" style={{ background: "#000" }}>
                    Agent
                  </option>
                  <option value="musicLabel" style={{ background: "#000" }}>
                    Music Label
                  </option>
                  <option value="management" style={{ background: "#000" }}>
                    Management
                  </option>
                  <option value="venue" style={{ background: "#000" }}>
                    Venue
                  </option>
                  <option value="artist" style={{ background: "#000" }}>
                    Artist
                  </option>
                  <option value="other" style={{ background: "#000" }}>
                    Other
                  </option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="number-artist" fontSize="16px">
                  How many DJs can you invite?
                </FormLabel>
                <Select
                  id="artistCount"
                  value={djCount}
                  onChange={(e) => setDJCount(e.target.value as DJCount)}
                >
                  {DJCountOptions.map((item) => (
                    <option
                      value={item.value}
                      key={item.value}
                      style={{ background: "#000" }}
                    >
                      {item.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Text mt="5px" fontWeight="600" lineHeight="1em" fontSize="18px">
                Personal Details
              </Text>
              <FormControl>
                <FormLabel htmlFor="first-name" display="none">
                  First Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiUser />
                  </InputLeftElement>
                  <Input
                    id="first-name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="last-name" display="none">
                  Last Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiUser />
                  </InputLeftElement>
                  <Input
                    id="last-name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="emailCreds" display="none">
                  Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiMail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="emailCreds"
                    id="emailCreds"
                    placeholder="Email Address"
                    value={emailCreds}
                    onChange={(e) => setEmailCreds(e.target.value)}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl
                isInvalid={!isEmailValid && confirmEmailCreds.length > 0}
              >
                <FormLabel htmlFor="confirmEmailCreds" display="none">
                  Confirm Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiMail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="confirmEmailCreds"
                    id="confirmEmailCreds"
                    placeholder="Confirm Email Address"
                    value={confirmEmailCreds}
                    onChange={(e) => setConfirmEmailCreds(e.target.value)}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                </InputGroup>
                {!isEmailValid && (
                  <FormErrorMessage>Email must match</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone" display="none">
                  Phone
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiPhone color="gray.300" />
                  </InputLeftElement>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="company" display="none">
                  Company
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiOfficeBuilding color="gray.300" />
                  </InputLeftElement>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl
                isInvalid={!isPasswordValid && passwordCreds.length > 0}
              >
                <FormLabel htmlFor="passwordCreds" display="none">
                  Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiLockClosed color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="passwordCreds"
                    id="passwordCreds"
                    placeholder="Enter a Password"
                    fontSize="16px"
                    lineHeight="1em"
                    pr="4.5rem"
                    _focus={{ border: "2px solid #00f5d4" }}
                    value={passwordCreds}
                    onChange={(e) => setPasswordCreds(e.target.value)}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                  <InputRightElement h={"full"}>
                    <Box
                      cursor="pointer"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <HiEye /> : <HiEyeOff />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
                {!isPasswordValid && (
                  <HStack justifyContent="space-between">
                    <FormErrorMessage>
                      Password must be 8+ characters
                    </FormErrorMessage>
                    <FormErrorMessage color="#fff">
                      {passwordCreds.length}/8
                    </FormErrorMessage>
                  </HStack>
                )}
              </FormControl>
              {isPasswordValid && (
                <FormControl
                  isInvalid={
                    !isConfirmPasswordValid && confirmPasswordCreds.length > 0
                  }
                >
                  <FormLabel htmlFor="confirmPasswordCreds" display="none">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <HiLockClosed color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPasswordCreds"
                      id="confirmPasswordCreds"
                      placeholder="Confirm Password"
                      fontSize="16px"
                      lineHeight="1em"
                      pr="4.5rem"
                      _focus={{ border: "2px solid #00f5d4" }}
                      value={confirmPasswordCreds}
                      onChange={(e) => setConfirmPasswordCreds(e.target.value)}
                      color="#fff"
                      focusBorderColor="#71fbfd"
                      _placeholder={{ opacity: 0.7, color: "#fff" }}
                    />
                    <InputRightElement h={"full"}>
                      <Box
                        cursor="pointer"
                        onClick={() =>
                          setShowConfirmPassword(
                            (showConfirmPassword) => !showConfirmPassword
                          )
                        }
                      >
                        {showPassword ? <HiEye /> : <HiEyeOff />}
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                  {!isConfirmPasswordValid && (
                    <FormErrorMessage>Passwords must match</FormErrorMessage>
                  )}
                </FormControl>
              )}
              <Checkbox
                size="sm"
                spacing="3"
                checked={termAccepted}
                onChange={(e) => setTermAccepted(e.target.checked)}
              >
                I agree to DJfan{" "}
                <Link href="/terms" color="cyan">
                  partner terms
                </Link>
              </Checkbox>
              <Button
                rightIcon={<HiArrowRight />}
                color="white"
                bg="#be04f1"
                mt="5px"
                _hover={{ color: "#be04f1", bg: "#ffffff" }}
                onClick={handleSubmit}
                isDisabled={!isFormValid() || !termAccepted}
                isLoading={isLoading}
              >
                CREATE ACCOUNT
              </Button>
              <Text textAlign="center" fontSize="12px">
                Once your Partner account is approved, you will have a{" "}
                <b>unique invitation link</b> to give to DJs. You will also be
                able to connect your bank account to <b>receive payouts</b>.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
