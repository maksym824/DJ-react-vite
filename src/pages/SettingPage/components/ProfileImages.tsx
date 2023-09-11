import { Flex, Avatar, Box, Image } from "@chakra-ui/react";
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

  useEffect(() => {
    setProfileImageToDisplay(profileImage);
    setCoverPhotoToDisplay(coverPhoto);
  }, [profileImage, coverPhoto]);

  const handleUploadProfileImage = async () => {
    if (newProfileImage) {
      const objectURL = URL.createObjectURL(newProfileImage);
      setProfileImageToDisplay(objectURL);
      try {
        const res = await updateProfilePicture(newProfileImage);
        console.log(res);
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
        const res = await updateCoverPhoto(newCoverPhoto);
        console.log(res);
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
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "20px", md: "40px" }}
    >
      <input
        type="file"
        ref={profileImageInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setNewProfileImage(e.target.files[0]);
          }
        }}
      />
      <input
        type="file"
        ref={coverPhotoInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setNewCoverPhoto(e.target.files[0]);
          }
        }}
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
  );
};

export default ProfileImages;
