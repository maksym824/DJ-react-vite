import { Flex, Avatar, Box, Image, useToast, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  updateCoverPhoto,
  updateProfilePicture,
} from "~/services/settings/userImage";

type Props = {
  profileImage: string;
  coverPhoto: string;
};

const ProfileImages = ({ profileImage, coverPhoto }: Props) => {
  const [profileImageToDisplay, setProfileImageToDisplay] =
    useState<string>(profileImage);
  const [coverPhotoToDisplay, setCoverPhotoToDisplay] =
    useState<string>(coverPhoto);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const coverPhotoInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const precheckImage = (selectedFile: File) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxFileSizeInBytes = 10 * 1024 * 1024; // 10 MB

    // Check file type
    if (!allowedFileTypes.includes(selectedFile.type)) {
      toast({
        description:
          "Invalid file type. Please choose a JPEG, PNG, or WEBP file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    // Check file size
    if (selectedFile.size > maxFileSizeInBytes) {
      toast({
        description: "File size exceeds the maximum limit of 10MB.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    setProfileImageToDisplay(profileImage);
    setCoverPhotoToDisplay(coverPhoto);
  }, [profileImage, coverPhoto]);

  const handleUploadProfileImage = async () => {
    if (newProfileImage) {
      const objectURL = URL.createObjectURL(newProfileImage);
      setProfileImageToDisplay(objectURL);
      try {
        await updateProfilePicture(newProfileImage);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUploadCoverPhoto = async () => {
    if (newCoverPhoto) {
      const objectURL = URL.createObjectURL(newCoverPhoto);
      setCoverPhotoToDisplay(objectURL);
      try {
        await updateCoverPhoto(newCoverPhoto);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleUploadProfileImage();
  }, [newProfileImage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleUploadCoverPhoto();
  }, [newCoverPhoto]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "20px", md: "40px" }}
      >
        <input
          type="file"
          ref={profileImageInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            if (!e.target.files || !e.target.files.length) return;
            const selectedFile = e.target.files[0];
            const check = precheckImage(selectedFile);
            if (!check) return;

            // Set the selected file if it passes validations
            setNewProfileImage(e.target.files[0]);
          }}
          accept=".jpeg, .png, .webp"
        />
        <input
          type="file"
          ref={coverPhotoInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            if (!e.target.files || !e.target.files.length) return;
            const selectedFile = e.target.files[0];
            const check = precheckImage(selectedFile);
            if (!check) return;

            // Set the selected file if it passes validations
            setNewCoverPhoto(selectedFile);
          }}
          accept=".jpeg, .png, .webp"
        />
        <Flex direction="column" gap="10px" alignItems="flex-start">
          <Box fontSize="16px" fontWeight="600" lineHeight="1em">
            Profile Image
          </Box>
          <Avatar size="xl" src={profileImageToDisplay} />
          <Box
            color="#fff"
            as="a"
            mt="5px"
            cursor="pointer"
            bg="#111"
            fontSize="10px"
            fontWeight="600"
            px="8px"
            py="6px"
            borderRadius="5px"
            lineHeight="1em"
            _hover={{ bg: "#8553f4" }}
            onClick={() => {
              if (profileImageInputRef.current) {
                profileImageInputRef.current.click();
              }
            }}
          >
            UPDATE IMAGE
          </Box>
        </Flex>
        <Flex direction="column" gap="10px" alignItems="flex-start">
          <Box fontSize="16px" fontWeight="600" lineHeight="1em">
            Cover Photo
          </Box>
          <Image
            width="160px"
            height="96px"
            objectFit="cover"
            src={coverPhotoToDisplay}
          />

          <Box
            color="#fff"
            as="a"
            mt="5px"
            cursor="pointer"
            bg="#111"
            fontSize="10px"
            fontWeight="600"
            px="8px"
            py="6px"
            borderRadius="5px"
            lineHeight="1em"
            _hover={{ bg: "#8553f4" }}
            onClick={() => {
              if (coverPhotoInputRef.current) {
                coverPhotoInputRef.current.click();
              }
            }}
          >
            UPDATE IMAGE
          </Box>
        </Flex>
      </Flex>
      <Text fontSize="14px" color="#000" mt="5px" lineHeight="1.5em">
        Allow file type: jpeg, png, webp and max file size 10Mb
      </Text>
    </>
  );
};

export default ProfileImages;
