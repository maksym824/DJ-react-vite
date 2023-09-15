import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { updateUserData, useUserData } from "~/services/settings/userData";

export default function ProfileLinks() {
  const { data, refetch } = useUserData();
  const toast = useToast();
  const [website, setWebsite] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [soundcloud, setSoundcloud] = useState<string>("");
  const [mixcloud, setMixcloud] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [spotify, setSpotify] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setWebsite(data?.website ?? "");
    setInstagram(data?.instagram ?? "");
    setSoundcloud(data?.soundcloud ?? "");
    setMixcloud(data?.mixcloud ?? "");
    setFacebook(data?.facebook ?? "");
    setTiktok(data?.tiktok ?? "");
    setYoutube(data?.youtube ?? "");
    setSpotify(data?.spotify ?? "");
  }, [data]);

  const handleUpdateProfile = async () => {
    const payload = {
      website,
      instagram,
      soundcloud,
      mixcloud,
      facebook,
      tiktok,
      youtube,
      spotify,
    };
    setIsLoading(true);
    try {
      const res = await updateUserData(payload);
      if (res.data?.result?.result) {
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

  return (
    <Stack p="20px" bg="#fff" mt="20px" borderRadius="10px">
      <FormControl mb={4}>
        <FormLabel>Website</FormLabel>
        <Input
          type="text"
          placeholder=" e.g. artistname.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Instagram Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter only username (no link)"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Soundcloud Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter only username (no link)"
          value={soundcloud}
          onChange={(e) => setSoundcloud(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Mixcloud Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter only username (no link)"
          value={mixcloud}
          onChange={(e) => setMixcloud(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Facebook Page Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter only username (no link)"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>TikTok Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter only username (no link)"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>YouTube Channel</FormLabel>
        <Input
          type="text"
          placeholder="Enter full link e.g. https://www.youtube.com/..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Spotify Artist Page</FormLabel>
        <Input
          type="text"
          placeholder="Enter full link e.g. https://open.spotify/artist..."
          value={spotify}
          onChange={(e) => setSpotify(e.target.value)}
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
        isLoading={isLoading}
      >
        UPDATE PROFILE LINKS <FaArrowRight style={{ marginLeft: "5px" }} />
      </Button>
    </Stack>
  );
}
