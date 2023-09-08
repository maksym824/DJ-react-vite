import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Input,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import ProfileImages from "./ProfileImages";
import { useEffect, useState } from "react";
import getCountryList from "~/services/settings/getCountryList";
import { Country } from "~/types";
import { updateUserData, useUserData } from "~/services/settings/userData";

export default function ProfileSettings() {
  const [countries, setCountries] = useState<Country[]>([]);
  const { data, refetch } = useUserData();

  const [displayName, setDisplayName] = useState<string>(
    data?.display_name ?? ""
  );
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [bookingsContact, setBookingsContact] = useState<string>("");
  const [managementContact, setManagementContact] = useState<string>("");
  const [aboutMe, setAboutMe] = useState<string>("");
  const [coverPhoto, setCoverPhoto] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  const handleGetCountries = async () => {
    try {
      const res = await getCountryList();
      setCountries(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetCountries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDisplayName(data?.display_name ?? "");
    setTitle(data?.title ?? "");
    setGenre(data?.genre ?? "");
    setLocation(data?.location ?? "");
    setCountry(data?.country ?? "");
    setBookingsContact(data?.bookings ?? "");
    setManagementContact(data?.management ?? "");
    setAboutMe(data?.about_me ?? "");
    setCoverPhoto(data?.cover_photo ?? "");
    setProfilePicture(data?.profile_picture ?? "");
  }, [data]);

  const handleUpdateProfile = async () => {
    const payload = {
      display_name: displayName,
      title,
      genre: genre,
      location,
      country,
      bookings: bookingsContact,
      management: managementContact,
      about_me: aboutMe,
    };

    try {
      const res = await updateUserData(payload);
      if (res.data?.result?.result) {
        await refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack p="20px" bg="#fff" mt="20px" borderRadius="10px">
      <ProfileImages profileImage={profilePicture} coverPhoto={coverPhoto} />
      <Box py="10px">
        <Divider borderColor="#858585" />
      </Box>
      <FormControl mb={4}>
        <FormLabel>DJ Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your DJ name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          placeholder="e.g. DJ & Producer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Music Genre</FormLabel>
        <Input
          type="text"
          placeholder="e.g. Techno, Tech House"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Location</FormLabel>
        <Input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {countries?.map((country, index) => (
            <option key={index} value={country.country}>
              {country.country}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Bookings Contact</FormLabel>
        <Input
          type="text"
          placeholder="Enter your bookings contact"
          value={bookingsContact}
          onChange={(e) => setBookingsContact(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Management Contact</FormLabel>
        <Input
          type="text"
          placeholder="Enter your management contact"
          value={managementContact}
          onChange={(e) => setManagementContact(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>About Me</FormLabel>
        <Textarea
          placeholder="Write something about yourself..."
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />
      </FormControl>

      <Button
        type="submit"
        background="#300a6e"
        color="#fff"
        fontSize="18px"
        _hover={{ background: "#111" }}
        height="45px"
        onClick={handleUpdateProfile}
      >
        UPDATE PROFILE <FaArrowRight style={{ marginLeft: "5px" }} />
      </Button>
    </Stack>
  );
}
