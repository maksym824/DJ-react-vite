import {
  Box,
  Button,
  Flex,
  Input,
  Progress,
  Select,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { FaMusic, FaRegEdit, FaReply, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import getPostToken from "../../services/getPostToken";
import { uploadChunkFile, uploadFile } from "../../services/uploadFile";
import { AxiosProgressEvent } from "axios";
import { AccessLevelType, PostType, TypeOfAttachedFile } from "../../types";
import setPostData from "~/services/setPostData";

const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1Gb
const CHUNK_SIZE = 10 * 1024 * 1024; // 10Mb

const AudioPost = () => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "audio/*": [
          ".mp3",
          ".mpeg",
          ".wav",
          ".mp3",
          ".mpeg",
          ".ogg",
          ".aiff",
          ".flac",
        ],
      },
    });
  const navigate = useNavigate();
  const toast = useToast();
  const [typeOfAttachedFile, setTypeOfAttachedFile] =
    useState<TypeOfAttachedFile>(TypeOfAttachedFile.UPLOAD);
  const [postToken, setPostToken] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<
    AccessLevelType | undefined
  >(undefined);
  const [description, setDescription] = useState<string>("");
  const [locationToEmbed, setLocationToEmbed] = useState<string>("");

  const [chunks, setChunks] = useState<Blob[]>([]);
  const currentChunk = useRef<number>(0);
  const [totalChunks, setTotalChunks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgress(percentCompleted);
  };

  const handleInitPostToken = async () => {
    const token = await getPostToken(PostType.audio);
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

  const splitFileIntoChunks = (file: File) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const chunks = [];

    let start = 0;
    for (let i = 0; i < totalChunks; i++) {
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      chunks.push(chunk);
      start = end;
    }
    setChunks(chunks);
    setTotalChunks(totalChunks);
  };

  const uploadChunks = async () => {
    setIsUploading(true);
    if (currentChunk?.current < totalChunks) {
      const chunk = chunks[currentChunk.current];

      try {
        await uploadChunkFile(
          chunk,
          postToken,
          totalChunks,
          currentChunk.current + 1,
          fileToUpload?.name ?? ""
        );
        // Chunk uploaded successfully, move to the next chunk
        currentChunk.current++;
        setProgress(Math.round((currentChunk.current / totalChunks) * 100));
        await uploadChunks(); // Recursively upload the next chunk
      } catch (error) {
        console.error("Error uploading chunk:", error);
      }
    } else {
      setIsUploading(false);
      setProgress(0);
      setChunks([]);
      currentChunk.current = 0;
    }
  };

  useEffect(() => {
    if (chunks.length && fileToUpload?.name) {
      uploadChunks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunks, fileToUpload]);

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const file = acceptedFiles[0];
      if (file.size > MAX_FILE_SIZE) return;
      setFileToUpload(acceptedFiles[0]);
      if (file.size <= CHUNK_SIZE) {
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
        splitFileIntoChunks(file);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleSaveAudioPost = async () => {
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
    if (typeOfAttachedFile === TypeOfAttachedFile.EMBED) {
      submittedData.embedded = 1;
      submittedData.location = locationToEmbed;
    } else {
      submittedData.embedded = 0;
      submittedData.files = [fileToUpload?.name ?? ""];
    }
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
            <FaMusic />
            <Text fontWeight="bold" ml={2}>
              Create Audio Post
            </Text>
          </Flex>
          <Flex grow={1} flexDirection="column" bg="white" color="black" p="2">
            <Text my="10px">Select audio post type</Text>
            <Flex height="min-content" mt="1">
              <Box
                cursor="pointer"
                border="1px solid #ccc"
                p="2"
                borderTopLeftRadius="5px"
                borderBottomLeftRadius="5px"
                backgroundColor={
                  typeOfAttachedFile === TypeOfAttachedFile.EMBED
                    ? "#a37cf0"
                    : "white"
                }
                onClick={() => setTypeOfAttachedFile(TypeOfAttachedFile.EMBED)}
              >
                Embed Audio
              </Box>
              <Box
                cursor="pointer"
                border="1px solid #ccc"
                p="2"
                borderTopRightRadius="5px"
                borderBottomRightRadius="5px"
                backgroundColor={
                  typeOfAttachedFile === TypeOfAttachedFile.UPLOAD
                    ? "#a37cf0"
                    : "white"
                }
                onClick={() => setTypeOfAttachedFile(TypeOfAttachedFile.UPLOAD)}
              >
                Upload Audio
              </Box>
              {isUploading && (
                <Box padding={4}>
                  <Spinner />
                </Box>
              )}
            </Flex>
            {typeOfAttachedFile === TypeOfAttachedFile.UPLOAD ? (
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
                    Drag and drop some files here, or click to select files.
                    Allowed file formats are wav, mp3, mpeg, ogg, aiff, flac.
                    Max file size 1Gb.
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

            <Box mt="20px">
              <Text>
                Keep in mind that it my take up to several of minutes to get
                your post ready for publication, it depends on size, encoding &
                workload.
              </Text>
            </Box>

            {selectedPrivacy &&
            (typeOfAttachedFile === TypeOfAttachedFile.UPLOAD
              ? fileToUpload
              : locationToEmbed) &&
            description &&
            !isUploading ? (
              <Button
                mt="20px"
                isLoading={isLoading}
                colorScheme="purple"
                onClick={handleSaveAudioPost}
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

export default AudioPost;
