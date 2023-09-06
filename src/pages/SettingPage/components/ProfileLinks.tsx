import { Button, FormControl, FormLabel, Stack, Input } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export default function ProfileLinks() {
  return (
    <Stack p="20px" bg="#fff" mt="20px" borderRadius="10px">
      <FormControl mb={4}>
        <FormLabel>Website</FormLabel>
        <Input type="text" placeholder=" e.g. artistname.com" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Instagram Username</FormLabel>
        <Input type="text" placeholder="Enter only username (no link)" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Soundcloud Username</FormLabel>
        <Input type="text" placeholder="Enter only username (no link)" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Mixcloud Username</FormLabel>
        <Input type="text" placeholder="Enter only username (no link)" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Facebook Page Username</FormLabel>
        <Input type="text" placeholder="Enter only username (no link)" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>TikTok Username</FormLabel>
        <Input type="text" placeholder="Enter only username (no link)" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>YouTube Channel</FormLabel>
        <Input
          type="text"
          placeholder="Enter full link e.g. https://www.youtube.com/..."
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Spotify Artist Page</FormLabel>
        <Input
          type="text"
          placeholder="Enter full link e.g. https://open.spotify/artist..."
        />
      </FormControl>

      <Button
        type="submit"
        background="#300a6e"
        color="#fff"
        fontSize="18px"
        _hover={{ background: "#111" }}
        height="45px"
      >
        UPDATE PROFILE LINKS <FaArrowRight style={{ marginLeft: "5px" }} />
      </Button>
    </Stack>
  );
}
