import {
  Box,
  Button,
  Flex,
  Input,
  Progress,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { FaRegEdit, FaReply, FaTrash, FaVideo } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import getPostToken from "../../services/getPostToken";
import { uploadFile, uploadLargeFile } from "../../services/uploadFile";
import { AxiosProgressEvent } from "axios";
import { AccessLevelType, PostType, TypeOfVideo } from "../../types";
import setPostDataVideo from "../../services/createVideoPost";

const MAX_FILE_SIZE = 750 * 1024 * 1024; // 750MB

const VideoPost = () => {
  const [typeOfVideo, setTypeOfVideo] = useState<TypeOfVideo>(
    TypeOfVideo.UPLOAD
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "video/mp4": [],
        "video/mov": [],
      },
    });
  const navigate = useNavigate();
  const [postToken, setPostToken] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<
    AccessLevelType | undefined
  >(undefined);
  const [description, setDescription] = useState<string>("");
  const [locationToEmbed, setLocationToEmbed] = useState<string>("");

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgress(percentCompleted);
  };

  const handleInitPostToken = async () => {
    const token = await getPostToken(PostType.video);
    setPostToken(token as string);
  };

  useEffect(() => {
    handleInitPostToken();
  }, []);

  useEffect(() => {
    if (acceptedFiles.length && postToken.length) {
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const file = acceptedFiles[0];
      if (file.size > MAX_FILE_SIZE) return;
      setFileToUpload(acceptedFiles[0]);
      if (file.size <= 100 * 1024 * 1024) {
        await uploadFile(acceptedFiles[0], postToken, onUploadProgress);
      } else {
        await uploadLargeFile(acceptedFiles[0], postToken, onUploadProgress);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handlePostVideo = async () => {
    const submittedData: {
      embedded?: number;
      body: string;
      accesslevel_id: AccessLevelType;
      files?: string[];
      location?: string;
    } = {
      body: description,
      accesslevel_id: selectedPrivacy!,
    };
    if (typeOfVideo === TypeOfVideo.EMBED) {
      submittedData.embedded = 1;
      submittedData.location = locationToEmbed;
    } else {
      submittedData.embedded = 0;
      submittedData.files = [fileToUpload?.name ?? ""];
    }
    try {
      const response = await setPostDataVideo(submittedData, postToken);
      console.log("data", response);
      navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <Header />
      <Box height="calc(100vh - 64px - 52px)" bg="black">
        <Flex mx={2} flexDirection={"column"} height="100%">
          <Flex
            bg="#30096e"
            color="white"
            alignItems="center"
            justifyContent="center"
            py={5}
            width={"100%"}
          >
            <FaVideo />
            <Text fontWeight="bold" ml={2}>
              Create Video Post
            </Text>
          </Flex>
          <Flex grow={1} flexDirection="column" bg="white" color="black" p="2">
            <Text my="10px">Select video post type</Text>
            <Flex height="min-content" mt="1">
              <Box
                cursor="pointer"
                border="1px solid #ccc"
                p="2"
                borderTopLeftRadius="5px"
                borderBottomLeftRadius="5px"
                backgroundColor={
                  typeOfVideo === TypeOfVideo.EMBED ? "#a37cf0" : "white"
                }
                onClick={() => setTypeOfVideo(TypeOfVideo.EMBED)}
              >
                Embed Video
              </Box>
              <Box
                cursor="pointer"
                border="1px solid #ccc"
                p="2"
                borderTopRightRadius="5px"
                borderBottomRightRadius="5px"
                backgroundColor={
                  typeOfVideo === TypeOfVideo.UPLOAD ? "#a37cf0" : "white"
                }
                onClick={() => setTypeOfVideo(TypeOfVideo.UPLOAD)}
              >
                Upload Video
              </Box>
            </Flex>
            {typeOfVideo === TypeOfVideo.UPLOAD ? (
              <Box mt="20px">
                <Box
                  border={
                    isDragActive ? "1px dashed #30096e" : "1px dashed #ccc"
                  }
                  borderRadius="10px"
                  backgroundColor={isDragActive ? "#f5f5f5" : "white"}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Text p="10px">
                    Drag and drop some files here, or click to select files
                  </Text>
                </Box>
                {isUploading ? (
                  <Box mt="10px">
                    <Text mb="10px">Uploading {fileToUpload?.name}</Text>
                    <Progress hasStripe value={progress} />
                  </Box>
                ) : fileToUpload ? (
                  <Flex alignItems="center" mt="10px">
                    <FaTrash onClick={() => setFileToUpload(null)} />
                    <Text ml="10px">{fileToUpload?.name}</Text>
                  </Flex>
                ) : null}
              </Box>
            ) : (
              <Box mt="10px">
                <Input
                  mt="10px"
                  placeholder="Enter URL"
                  value={locationToEmbed}
                  onChange={(e) => setLocationToEmbed(e.target.value)}
                />
              </Box>
            )}
            <Textarea
              mt="20px"
              placeholder="Write something about this post"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box mt="20px">
              <Text>Who can view this post?</Text>
              <Select
                mt="10px"
                placeholder="Select privacy option"
                onChange={(e) =>
                  setSelectedPrivacy(
                    e.target.value as unknown as AccessLevelType
                  )
                }
              >
                <option value={AccessLevelType.EVERYONE}>Everyone</option>
                <option value={AccessLevelType.GOLD}>GOLD</option>
                <option value={AccessLevelType.VIP}>VIP</option>
              </Select>
            </Box>
            {selectedPrivacy &&
            (typeOfVideo === TypeOfVideo.UPLOAD
              ? fileToUpload
              : locationToEmbed) &&
            description &&
            !isUploading ? (
              <Button mt="20px" colorScheme="purple" onClick={handlePostVideo}>
                Post
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </Box>
      <Box
        as="nav"
        role="navigation"
        position="sticky"
        bottom="0"
        zIndex="docked"
        bg="bg-accent"
      >
        <Flex bg="black" w="100%" display="flex" justifyContent="center">
          <Flex
            maxW="1024px"
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            px={{ base: "10px", md: "0px" }}
            py="10px"
          >
            <Button
              ml={{ base: "0px", md: "10px" }}
              display="flex"
              alignItems="center"
              gap="4px"
              color="white"
              borderRadius="5px"
              background="transparent"
              _hover={{
                cursor: "pointer",
              }}
              border="none"
              fontWeight="600"
              height="35px"
            >
              <Flex fontSize="1rem" alignItems="center">
                <FaReply />
                <Text ml={1} fontSize={14}>
                  Return to Profile
                </Text>
              </Flex>
            </Button>
            <Button
              ml={{ base: "0px", md: "10px" }}
              display="flex"
              alignItems="center"
              gap="4px"
              color="white"
              borderRadius="5px"
              background="transparent"
              _hover={{
                cursor: "pointer",
              }}
              border="none"
              fontWeight="600"
              height="35px"
              onClick={() => navigate("/")}
            >
              <Flex fontSize="1rem" alignItems="center">
                <FaRegEdit />
                <Text ml={1} fontSize={14}>
                  Change Post type
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default VideoPost;
