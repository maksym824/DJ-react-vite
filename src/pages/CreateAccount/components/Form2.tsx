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
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useUsernameCheck } from "~/services/settings/userAccount";

export const Form2 = () => {
  const { username, setUsername } = useCreateAccountContext();
  const [onTouched, setTouched] = useState<boolean>(false);
  const { data: userCheck = {}, refetch } = useUsernameCheck(username);

  const isValidUsername = useMemo(() => {
    const testRes = /^[a-zA-Z0-9\-_]{3,50}$/.test(username);
    if (!testRes) {
      return false;
    }
    return !!userCheck;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, userCheck]);

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (username && username.length > 2) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Stack bg="#fff" pt="20px" pb="20px" px="20px" gap="15px">
      <Box textAlign="center">
        <Heading mb="5px" fontSize="20px">
          Choose a Username
        </Heading>
        <Heading fontSize="14px" fontWeight="500">
          Your username creates your profile page link
        </Heading>
      </Box>
      <FormControl>
        <InputGroup size="md">
          <InputLeftAddon children="djfan.app/artists/" />
          <Input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={handleChangeUserName}
            isInvalid={onTouched && !isValidUsername}
            focusBorderColor={isValidUsername ? "green" : "red"}
            errorBorderColor="red"
            onFocus={() => setTouched(true)}
          />
        </InputGroup>
      </FormControl>
    </Stack>
  );
};
