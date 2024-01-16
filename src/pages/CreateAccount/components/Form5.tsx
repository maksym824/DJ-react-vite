import { ChangeEvent, useEffect } from "react";
import {
  Button,
  Heading,
  VStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Text,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import {
  updateCoverPhoto,
  updateProfilePicture,
} from "~/services/settings/userImage";
import { useCreateAccountContext } from "../useCreateAccountContext";

const helpStyle = {
  fontSize: "12px",
  lineHeight: "1em",
  pt: "10px",
  pl: "10px",
};

export const Form5 = () => {
  const {
    profileImage,
    setProfileImage,
    coverImage,
    setCoverImage,
    profilePreview,
    setProfilePreview,
    coverPreview,
    setCoverPreview,
  } = useCreateAccountContext();
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

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      if (!precheckImage(file)) return;
      setProfileImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
    }
  };

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      if (!precheckImage(file)) return;
      setCoverImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfilePreview("");
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setCoverPreview("");
  };

  const handleUploadProfileImage = async () => {
    try {
      await updateProfilePicture(profileImage as File);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadCoverImage = async () => {
    try {
      await updateCoverPhoto(coverImage as File);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (profileImage) {
      handleUploadProfileImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImage]);

  useEffect(() => {
    if (coverImage) {
      handleUploadCoverImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverImage]);

  return (
    <Stack bg="#fff" pt="20px" pb="20px" px="20px" gap="15px">
      <Box textAlign="center">
        <Heading mb="5px" fontSize="20px">
          Profile & Cover Photos
        </Heading>
        <Heading fontSize="14px" fontWeight="500">
          Finally, let's add some photos!
        </Heading>
      </Box>

      <FormControl>
        <FormLabel>Upload Profile Avatar</FormLabel>
        <HStack position="relative">
          <label>
            <Input
              type="file"
              accept=".jpeg, .png, .webp"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
            <Button as="span">Select Image</Button>
          </label>
        </HStack>
        <Text fontSize="14px" color="#000" mt="5px" lineHeight="1.5em">
          Allow file type: jpeg, png, webp and max file size 10Mb
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Upload Cover Photo</FormLabel>
        <HStack position="relative">
          <label>
            <Input
              type="file"
              accept=".jpeg, .png, .webp"
              onChange={handleCoverImageChange}
              style={{ display: "none" }}
            />
            <Button as="span">Select Image</Button>
          </label>
        </HStack>
        <Text fontSize="14px" color="#000" mt="5px" lineHeight="1.5em">
          Allow file type: jpeg, png, webp and max file size 10Mb
        </Text>
      </FormControl>

      <Box position="relative" mt="2">
        <Stack
          py="30px"
          alignItems="center"
          position="relative"
          bgImage={coverPreview}
          bgSize="cover"
          bgColor="grey"
          bgRepeat="no-repeat"
          bgPos="center"
          opacity="0.7"
        >
          {coverPreview && (
            <Box
              zIndex="10"
              aria-label="Remove image"
              position="absolute"
              bg="black"
              top="10px"
              right="10px"
              onClick={handleRemoveCoverImage}
              borderRadius="100%"
              p="2px"
            >
              <FaTimes color="white" />
            </Box>
          )}
          <VStack position="relative">
            {profilePreview && (
              <Box
                aria-label="Remove image"
                position="absolute"
                bg="black"
                top="-5px"
                right="-15px"
                onClick={handleRemoveProfileImage}
                borderRadius="100%"
                p="2px"
              >
                <FaTimes color="white" />
              </Box>
            )}
            <Avatar
              bg="black"
              src={profilePreview}
              showBorder
              borderColor="cyan"
              size="lg"
            />
          </VStack>
        </Stack>
        <Text {...helpStyle}>
          Begin uploading to preview your profile images.
        </Text>
      </Box>
    </Stack>
  );
};
