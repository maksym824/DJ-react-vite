import {
  Heading,
  FormControl,
  Input,
  InputGroup,
  Stack,
  Box,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useCreateAccountContext } from "../useCreateAccountContext";
import { ChangeEvent, useEffect, useState } from "react";
import { useUsernameCheck as useProfileURLCheck } from "~/services/settings/userAccount";

export const Form4 = () => {
  const { profileURL, setProfileURL } = useCreateAccountContext();
  const [onTouched, setTouched] = useState<boolean>(false);
  const { data: userCheck = {}, refetch } = useProfileURLCheck(profileURL);

  const handleChangeProfileURL = (e: ChangeEvent<HTMLInputElement>) => {
    let profile_url = e.target.value;
    const regex = /[^a-z0-9\-_]/;
    profile_url = profile_url.toLowerCase();
    profile_url = profile_url.replace(regex, "");
    profile_url = profile_url.substring(0, 50);
    setProfileURL(profile_url);
  };

  useEffect(() => {
    if (profileURL && profileURL.length > 2) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileURL]);

  return (
    <Stack bg="#fff" pt="20px" pb="20px" px="20px" gap="15px">
      <Box textAlign="center">
        <Heading mb="5px" fontSize="20px">
          Choose a Profile URL
        </Heading>
        <Heading fontSize="14px" fontWeight="500">
          Your Profle URL creates your profile page link
        </Heading>
      </Box>
      <FormControl>
        <InputGroup size="md">
          <InputLeftAddon children="djfan.app/artists/" />
          <Input
            type="text"
            id="profileURL"
            placeholder="profileURL"
            value={profileURL}
            onChange={handleChangeProfileURL}
            isInvalid={onTouched && !userCheck}
            focusBorderColor={
              !onTouched || profileURL.length === 0
                ? "black.500"
                : userCheck
                ? "green.500"
                : "red.500"
            }
            onFocus={() => setTouched(true)}
          />
        </InputGroup>
      </FormControl>
    </Stack>
  );
};
