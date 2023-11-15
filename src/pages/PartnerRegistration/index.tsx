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
  useNumberInput,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  HiPhone,
  HiMail,
  HiLockClosed,
  HiOfficeBuilding,
  HiUser,
  HiMinus,
  HiPlus,
  HiEye,
  HiEyeOff,
  HiArrowRight,
} from "react-icons/hi";

export default function PartnerRegistration() {
  const [emailCreds, setEmailCreds] = useState("");
  const [passwordCreds, setPasswordCreds] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [partnerType, setPartnerType] = useState("");
  const [artistCount, setartistCount] = useState("");
  const [confirmPasswordCreds, setConfirmPasswordCreds] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isPasswordValid = passwordCreds.length >= 8;
  const isConfirmPasswordValid = passwordCreds === confirmPasswordCreds;
  // const colorScheme = isConfirmPasswordValid ? "green" : "red";
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

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
            <Text textAlign="center" fontSize="18px" px="15px">
              Refer creators and receive{" "}
              <Box display="inline" fontWeight="600" color="cyan">
                5% commission
              </Box>{" "}
              on the DJfan earnings of each artist.
            </Text>
          </Stack>

          <Stack w="100%" px={{ base: "25px", md: "15px" }} as="form">
            <Stack spacing="15px">
              <FormControl>
                <FormLabel htmlFor="partnerType" fontSize="16px">
                  What describes you best?
                </FormLabel>
                <Select
                  id="partnerType"
                  placeholder="Please choose"
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  color="#fff"
                  focusBorderColor="#71fbfd"
                  _placeholder={{ opacity: 0.7, color: "#fff" }}
                >
                  <option value="agent">Agent</option>
                  <option value="musicLabel">Music Label</option>
                  <option value="management">Management</option>
                  <option value="venue">Venue</option>
                  <option value="artist">Artist</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="number-artist" fontSize="16px">
                  How many DJs can you invite?
                </FormLabel>
                <HStack>
                  <Flex
                    bg="#fff"
                    color="#111"
                    alignItems="center"
                    height="full"
                    py="10px"
                    px="9px"
                  >
                    <HiMinus {...dec} />
                  </Flex>
                  <Input
                    id="partnerType"
                    value={artistCount}
                    onChange={(e) => setartistCount(e.target.value)}
                    {...input}
                    color="#fff"
                    focusBorderColor="#71fbfd"
                    _placeholder={{ opacity: 0.7, color: "#fff" }}
                  />
                  <Flex
                    bg="#fff"
                    color="#111"
                    alignItems="center"
                    height="full"
                    py="10px"
                    px="8px"
                  >
                    <HiPlus {...inc} />
                  </Flex>
                </HStack>
              </FormControl>
              <Text mt="5px" fontWeight="600" lineHeight="1em" fontSize="18px">
                Personal Details
              </Text>
              <FormControl>
                <FormLabel htmlFor="last-name" display="none">
                  Full Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiUser />
                  </InputLeftElement>
                  <Input
                    id="last-name"
                    placeholder="Full Name"
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

              <Button
                rightIcon={<HiArrowRight />}
                color="white"
                bg="#be04f1"
                mt="5px"
                _hover={{ color: "#be04f1", bg: "#ffffff" }}
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
