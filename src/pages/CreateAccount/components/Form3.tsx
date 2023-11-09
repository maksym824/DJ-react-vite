import {
  Heading,
  FormControl,
  Input,
  InputLeftAddon,
  InputGroup,
  Stack,
  Box,
  Link,
} from "@chakra-ui/react";
import { FaInstagram, FaLink, FaSoundcloud } from "react-icons/fa";
import { useCreateAccountContext } from "../useCreateAccountContext";

export const Form3 = () => {
  const {
    instagram,
    soundcloud,
    website,
    setInstagram,
    setSoundcloud,
    setWebsite,
  } = useCreateAccountContext();

  return (
    <Stack bg="#fff" pt="20px" pb="20px" px="20px" gap="15px">
      <Box textAlign="center">
        <Heading mb="5px" fontSize="20px">
          Add Profile Links
        </Heading>
        <Heading fontSize="14px" fontWeight="500">
          Link to your website & other social profiles, why are we asking for
          this? We use Instagram to prevent impersonators and verify your DJfan
          profile.
        </Heading>
      </Box>
      <FormControl>
        <Box border="2px solid #3e0080" overflow="hidden" borderRadius="5px">
          <InputGroup
            overflow="hidden"
            borderRadius="0px"
            borderWidth="0"
            borderColor="#ffffff00"
          >
            <InputLeftAddon
              bgGradient="linear(to-r,#5c03bc, #e536ab)"
              {...iconStyle}
            >
              <FaInstagram fontSize="24px" color="white" />
            </InputLeftAddon>
            <Input
              type="text"
              borderRadius="0px"
              borderWidth="0"
              borderColor="#ffffff00"
              placeholder="Instagram Username"
              focusBorderColor="#ffffff00"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </InputGroup>
        </Box>
        {instagram && (
          <Link
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            pt="10px"
            display="flex"
            pl="10px"
          >
            instagram.com/<b>{instagram}</b>
          </Link>
        )}
      </FormControl>
      <FormControl>
        <Box border="2px solid #FF5500" overflow="hidden" borderRadius="5px">
          <InputGroup
            overflow="hidden"
            borderRadius="0px"
            borderWidth="0"
            borderColor="#ffffff00"
          >
            <InputLeftAddon bg="#FF5500" {...iconStyle}>
              <FaSoundcloud fontSize="25px" color="white" />
            </InputLeftAddon>
            <Input
              type="text"
              borderRadius="0px"
              borderWidth="0"
              borderColor="#ffffff00"
              placeholder="SoundCloud Username"
              focusBorderColor="#ffffff00"
              value={soundcloud}
              onChange={(e) => setSoundcloud(e.target.value)}
            />
          </InputGroup>
        </Box>
        {soundcloud && (
          <Link
            href={`https://soundcloud.com/${soundcloud}`}
            target="_blank"
            rel="noopener noreferrer"
            pt="10px"
            display="flex"
            pl="10px"
          >
            soundcloud.com/<b>{soundcloud}</b>
          </Link>
        )}
      </FormControl>
      <FormControl>
        <Box border="2px solid #111" overflow="hidden" borderRadius="5px">
          <InputGroup
            overflow="hidden"
            borderRadius="0px"
            borderWidth="0"
            borderColor="#ffffff00"
          >
            <InputLeftAddon
              bg="#fff"
              {...iconStyle}
              borderRight="2px solid #111"
            >
              <FaLink fontSize="20px" color="#111" />
            </InputLeftAddon>
            <Input
              type="url"
              borderRadius="0px"
              borderWidth="0"
              borderColor="#ffffff00"
              placeholder="Website e.g. artistname.com"
              focusBorderColor="#ffffff00"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </InputGroup>
        </Box>
        {website && (
          <Box as="span" pt="10px" display="flex" pl="10px">
            Website:&nbsp;
            <Link
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: "underline" }}
            >
              https://<b>{website}</b>
            </Link>
          </Box>
        )}
      </FormControl>
    </Stack>
  );
};

const iconStyle = {
  borderRadius: "0px",
  borderWidth: "0",
  borderColor: "#ffffff00",
  p: "0px 2px 0px 0px",
  width: "40px",
  justifyContent: "center",
};
