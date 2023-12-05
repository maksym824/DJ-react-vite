import { useEffect, useState } from "react";
import {
  Heading,
  ListItem,
  UnorderedList,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import getCountryList from "~/services/settings/getCountryList";
import { useCreateAccountContext } from "../useCreateAccountContext";
import { Country } from "~/types";
import { MdArrowDropDown } from "react-icons/md";

export const Form4 = () => {
  const [country, setCountry] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  const {
    setCountry: setSelectedCountry,
    shortBio,
    setShortBio,
    location,
    setLocation,
    countryCode,
    setCountryCode,
  } = useCreateAccountContext();

  const initCountry = async () => {
    try {
      const countryList = await getCountryList();
      setCountry(countryList);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to load country list",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack bg="#fff" pt="20px" pb="20px" px="20px" gap="15px">
      <Box textAlign="center">
        <Heading mb="5px" fontSize="20px">
          Basic Profile Information
        </Heading>
        <Box fontSize="14px" fontWeight="500">
          You can edit all of these later
        </Box>
      </Box>

      <FormControl>
        <FormLabel>Short Bio</FormLabel>
        <Input
          type="text"
          placeholder="e.g. DJ & Producer"
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
        />
        <Popover>
          <PopoverTrigger>
            <Box
              {...helpStyle}
              color="#a600ff"
              cursor="pointer"
              textDecoration="underline"
            >
              More Examples
            </Box>
          </PopoverTrigger>
          <PopoverContent _focus={{ boxShadow: "none" }}>
            <Stack p="15px">
              <Heading fontSize="15px" fontWeight="600">
                Make it short & sweet!
              </Heading>
              <UnorderedList fontSize="13px">
                <ListItem>Label Owner & Artist</ListItem>
                <ListItem>A wild Artist from Ibiza</ListItem>
                <ListItem>Electronic Musician</ListItem>
                <ListItem>Label Owner & Producer</ListItem>
                <ListItem>Turntablist & Sound Curator</ListItem>
              </UnorderedList>
            </Stack>
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
      </FormControl>

      <FormControl>
        <FormLabel>Main Location</FormLabel>
        <Input
          type="text"
          placeholder="e.g. Ibiza or London"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Where are you from?</FormLabel>
        <Select
          icon={loading ? <Spinner /> : <MdArrowDropDown />}
          placeholder="Select Country"
          value={countryCode}
          onChange={(e) => {
            const countryCode = e.target.value;
            const _country = countryCode
              ? (country.find((c) => c.country_code === countryCode) || {})
                  .country
              : "";
            setSelectedCountry(_country ?? "");
            setCountryCode(countryCode);
          }}
        >
          {country.map((country, index) => (
            <option key={index} value={country.country_code}>
              {country.country}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

const helpStyle = {
  fontSize: "12px",
  lineHeight: "1em",
  pt: "10px",
  pl: "10px",
};
