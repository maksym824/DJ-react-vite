import {
  Box,
  Button,
  Flex,
  Progress,
  Select,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { FaImages, FaRegEdit, FaReply, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import getPostToken from "../../services/getPostToken";
import { uploadFile, uploadLargeFile } from "../../services/uploadFile";
import { AxiosProgressEvent } from "axios";
import { AccessLevelType, PostType, TypeOfImagePost } from "../../types";
import setPostData from "../../services/createVideoPost";

const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1Gb

const ImagePost = () => {
  const [typeOfImagePost, setTypeOfImagePost] = useState<TypeOfImagePost>(
    TypeOfImagePost.SINGLE
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      },
      maxFiles: typeOfImagePost === TypeOfImagePost.SINGLE ? 1 : undefined,
    });

  const navigate = useNavigate();
  const toast = useToast();
  const [postToken, setPostToken] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState<File[] | null>([]);
  const [selectedPrivacy, setSelectedPrivacy] = useState<
    AccessLevelType | undefined
  >(undefined);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgress(percentCompleted);
  };

  const handleInitPostToken = async () => {
    const token = await getPostToken(PostType.image);
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
      setFileToUpload(acceptedFiles);
      if (file.size <= 100 * 1024 * 1024) {
        const res = await uploadFile(
          acceptedFiles[0],
          postToken,
          onUploadProgress
        );
        const { data } = res;
        if (!data.result) {
          toast({
            description: data.message ?? "Error uploading file",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
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

  const handlePostImage = async () => {
    const submittedData: {
      body: string;
      accesslevel_id: AccessLevelType;
      files?: string[];
    } = {
      body: description,
      accesslevel_id: selectedPrivacy!,
      files: fileToUpload?.map((x) => x.name),
    };
    setIsLoading(true);
    try {
      await setPostData(submittedData, postToken);
      toast({
        description: "Post created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/create");
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
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
            <FaImages />
            <Text fontWeight="bold" ml={2}>
              Create Image Post
            </Text>
          </Flex>
          <Flex grow={1} flexDirection="column" bg="white" color="black" p="2">
            <Text my="10px">Select post type</Text>
            <Flex height="min-content" mt="1">
              <Box
                cursor="pointer"
                border="1px solid #ccc"
                p="2"
                borderTopLeftRadius="5px"
                borderBottomLeftRadius="5px"
                backgroundColor={
                  typeOfImagePost === TypeOfImagePost.SINGLE
                    ? "#a37cf0"
                    : "white"
                }
                onClick={() => {
                  setTypeOfImagePost(TypeOfImagePost.SINGLE);
                  setFileToUpload(null);
                }}
              >
                Single Image
              </Box>
              <Box
                cursor="pointer"
                border="1px solid #ccc"
                p="2"
                borderTopRightRadius="5px"
                borderBottomRightRadius="5px"
                backgroundColor={
                  typeOfImagePost === TypeOfImagePost.MULTIPLE
                    ? "#a37cf0"
                    : "white"
                }
                onClick={() => {
                  setTypeOfImagePost(TypeOfImagePost.MULTIPLE);
                  setFileToUpload(null);
                }}
              >
                Multiple Images
              </Box>
              {isUploading && (
                <Box padding={4}>
                  <Spinner />
                </Box>
              )}
            </Flex>
            <Box mt="20px">
              <Box
                border={isDragActive ? "1px dashed #30096e" : "1px dashed #ccc"}
                borderRadius="10px"
                backgroundColor={isDragActive ? "#f5f5f5" : "white"}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Text p="10px">
                  Drag and drop some files here, or click to select files.
                  Allowed file formats are png, jpg, jpeg, webp.
                </Text>
              </Box>
              {isUploading ? (
                <>
                  {fileToUpload?.map((file, index) => (
                    <Box mt="10px" key={index}>
                      <Text mb="10px">Uploading {file?.name}</Text>
                      <Progress hasStripe value={progress} />
                    </Box>
                  ))}
                </>
              ) : fileToUpload ? (
                <>
                  {fileToUpload?.map((file, index) => (
                    <Flex alignItems="center" mt="10px" key={index}>
                      <FaTrash onClick={() => setFileToUpload(null)} />
                      <Text ml="10px">{file?.name}</Text>
                    </Flex>
                  ))}
                </>
              ) : null}
            </Box>
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
            fileToUpload?.length &&
            description &&
            !isUploading ? (
              <Button
                mt="20px"
                isLoading={isLoading}
                colorScheme="purple"
                onClick={handlePostImage}
              >
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
              onClick={() => navigate("/create")}
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
              onClick={() => navigate("/create")}
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

export default ImagePost;
