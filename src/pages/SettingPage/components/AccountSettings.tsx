import { Button, FormControl, FormLabel, Stack, Input } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export default function AccountSettings() {
  return (
    <Stack p="20px" bg="#fff" mt="20px" borderRadius="10px">
      <FormControl mb={4}>
        <FormLabel>First Name</FormLabel>
        <Input type="text" placeholder=" First Name" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Last Name</FormLabel>
        <Input type="text" placeholder="Last Name" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>New Email Address</FormLabel>
        <Input type="text" placeholder="Enter only username (no link)" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Confirm Email Address</FormLabel>
        <Input type="text" placeholder="Enter only username (no link)" />
      </FormControl>

      <Button
        type="submit"
        background="#300a6e"
        color="#fff"
        fontSize="18px"
        _hover={{ background: "#111" }}
        height="45px"
      >
        UPDATE PROFILE <FaArrowRight style={{ marginLeft: "5px" }} />
      </Button>
    </Stack>
  );
}
