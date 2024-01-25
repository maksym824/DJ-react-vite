import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useUserData } from "~/services/settings/userData";
import { MdModeEditOutline } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import AvatarEdit from "react-avatar-clip";
import { useRef, useState } from "react";
import {
  updateCoverPhoto,
  updateProfilePicture,
} from "~/services/settings/userImage";
import DJname from "./DJname";

async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}

const HeaderAvatar = () => {
  const { data: details, refetch } = useUserData();
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const [showModalUpdateImage, setShowModalUpdateImage] =
    useState<boolean>(false);
  const [typeOfUpdate, setTypeOfUpdate] = useState<"profile" | "cover">(
    "profile"
  );
  const artWorkInputRef = useRef<HTMLInputElement | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const toast = useToast();

  const onSaveChange = async () => {
    if (typeOfUpdate === "profile") {
      if (!newProfileImage) {
        return;
      }
      setIsSaving(true);
      try {
        await updateProfilePicture(newProfileImage);
        toast({
          title: "Update Profile Image Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setShowModalUpdateImage(false);
        await refetch();
      } catch (err) {
        console.log(err);
      } finally {
        setIsSaving(false);
      }
    } else {
      if (!newCoverPhoto) {
        return;
      }
      setIsSaving(true);
      try {
        await updateCoverPhoto(newCoverPhoto);
        toast({
          title: "Update Cover Photo Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setShowModalUpdateImage(false);
        await refetch();
      } catch (err) {
        console.log(err);
      } finally {
        setIsSaving(false);
      }
    }
  };
  return (
    <>
      <Stack
        w="100%"
        py="30px"
        alignItems="center"
        position="relative"
        bgImage={details?.cover_photo}
        bgSize="cover"
        bgColor="grey"
        bgRepeat="no-repeat"
        bgPos="center"
        opacity="0.7"
        px={{
          base: "15px",
          md: "0px",
        }}
      >
        <Menu isLazy closeOnSelect={true} closeOnBlur={true}>
          <MenuButton
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            position="absolute"
            top="10px"
            right="10px"
          >
            <Box as={FiMoreVertical} size="20px" color="black" />
          </MenuButton>
          <MenuList
            minW="max-content"
            fontSize="14px"
            bg="white"
            p="0"
            m="0"
            borderColor="gray.200"
          >
            <MenuItem
              py="10px"
              onClick={() => {
                setTypeOfUpdate("cover");
                setShowModalUpdateImage(true);
              }}
            >
              <Box as={MdModeEditOutline} size="16px" mr="8px" />
              <Text>Edit</Text>
            </MenuItem>
          </MenuList>
        </Menu>
        <VStack>
          <Box position="relative">
            <Avatar
              bg="black"
              src={details?.profile_picture}
              showBorder
              borderColor="cyan"
              size="xl"
            />
            <Flex
              position="absolute"
              bottom="0px"
              right="0px"
              justifyContent="center"
              alignItems="center"
              color="black"
              w="25px"
              h="25px"
              borderRadius="25px"
              bg="white"
              cursor="pointer"
              onClick={() => {
                setTypeOfUpdate("profile");
                setShowModalUpdateImage(true);
              }}
            >
              <MdModeEditOutline color="#000" />
            </Flex>
          </Box>
          <DJname name={details?.display_name ?? ""} />
          <Text
            color="white"
            textAlign="center"
            w={{
              base: "100%",
              md: "40%",
            }}
            dangerouslySetInnerHTML={{
              __html: details?.about_me ?? "",
            }}
          ></Text>
        </VStack>
      </Stack>
      <Modal
        isOpen={showModalUpdateImage}
        onClose={() => {
          setShowModalUpdateImage(false);
        }}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text textAlign="center" mb="25px">
              Edit Profile {typeOfUpdate === "profile" ? "Image" : "Cover"}
            </Text>
            {typeOfUpdate === "profile" ? (
              <AvatarEdit
                width={250}
                height={250}
                imageWidth={250}
                onCrop={async (newImage) => {
                  const res = await dataUrlToFile(newImage, "avatar.png");
                  setNewProfileImage(res);
                }}
              />
            ) : (
              <>
                <FormControl>
                  <FormLabel>Choose Cover Photo</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    border="0px"
                    p="2px"
                    ref={(ref) => (artWorkInputRef.current = ref)}
                    onChange={(e) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        setNewCoverPhoto(file);
                      }
                    }}
                  />
                </FormControl>
                {newCoverPhoto && (
                  <Box
                    as="img"
                    src={URL.createObjectURL(newCoverPhoto)}
                    w="100%"
                    h="auto"
                    mt="25px"
                  />
                )}
              </>
            )}
            <Button
              color="#fff"
              mt="25px"
              cursor="pointer"
              bg="#111"
              fontSize="10px"
              fontWeight="600"
              px="8px"
              py="6px"
              borderRadius="5px"
              lineHeight="1em"
              _hover={{ bg: "#8553f4" }}
              onClick={onSaveChange}
              isLoading={isSaving}
            >
              Save Change
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HeaderAvatar;
