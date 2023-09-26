import {
  Heading,
  FormControl,
  Box,
  Input,
  InputGroup,
  Stack,
  Text,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaHeadphones, FaUser } from "react-icons/fa";
import { useCreateAccountContext } from "../useCreateAccountContext";

const helpStyle = {
  fontSize: "12px",
  lineHeight: "1em",
  pt: "10px",
  pl: "10px",
};

export const Form1 = () => {
  const {
    displayName,
    firstName,
    lastName,
    setDisplayName,
    setFirstName,
    setLastName,
  } = useCreateAccountContext();

  return (
    <Stack bg="#fff" pt="20px" pb="20px" px="20px" gap="15px">
      <Box textAlign="center">
        <Heading mb="5px" fontSize="20px">
          Welcome to DJfan
        </Heading>
        <Heading fontSize="14px" fontWeight="500">
          Add your names to complete your account.
        </Heading>
      </Box>
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaHeadphones color="#111" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Artist Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaUser color="#111" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaUser color="#111" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputGroup>
        <Text {...helpStyle}>
          100% Privacy. Only your DJ name will be public.
        </Text>
      </FormControl>
    </Stack>
  );
};
