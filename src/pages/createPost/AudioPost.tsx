import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  const [title, setTitle] = useState<string>("");
  const [locationToEmbed, setLocationToEmbed] = useState<string>("");

  const [chunks, setChunks] = useState<Blob[]>([]);
  const [totalChunks, setTotalChunks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploadingArtwork, setIsUploadingArtwork] = useState<boolean>(false);
  const [artworkFileToUpload, setArtworkFileToUpload] = useState<File | null>(
    null
  );
  const artWorkInputRef = useRef<HTMLInputElement | null>(null);
  const [progressArtwork, setProgressArtwork] = useState<number>(0);
  const [releaseArtwork, setReleaseArtwork] = useState<File | null>(null);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgress(percentCompleted);
  };

  const onUploadArtworkProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgressArtwork(percentCompleted);
  };

  const handleUploadArtwork = async (file: File) => {
    setIsUploadingArtwork(true);
    try {
      if (!file) return;
      setArtworkFileToUpload(file);
      const res = await uploadFile(file, postToken, onUploadArtworkProgress);
      const { data } = res;
      if (!data.result) {
        toast({
          description: data.message ?? "Error uploading file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading artwork:", error);
    } finally {
      setIsUploadingArtwork(false);
      setProgressArtwork(0);
    }
  };

  useEffect(() => {
    if (releaseArtwork) {
      handleUploadArtwork(releaseArtwork);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseArtwork]);

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
    const maxConcurrency = 2;
    const chunkQueue: {
      chunk: Blob;
      chunkIndex: number;
    }[] = [];

    const uploadingChunks: number[] = [];
    const failedChunks: number[] = [];

    const processChunk = async (chunk: Blob, chunkIndex: number) => {
      try {
        const res = await uploadChunkFile(
          chunk,
          postToken,
          totalChunks,
          chunkIndex + 1,
          fileToUpload?.name ?? ""
        );

        if (res?.data?.result) {
          setProgress(Math.round(((chunkIndex + 1) / totalChunks) * 100));
        } else {
          console.error(`Chunk ${chunkIndex + 1} failed to upload`);
          failedChunks.push(chunkIndex);
        }
      } catch (error) {
        console.error(`Chunk ${chunkIndex + 1} failed to upload`);
        failedChunks.push(chunkIndex);
      }
      const index = uploadingChunks.indexOf(chunkIndex);
      if (index !== -1) {
        uploadingChunks.splice(index, 1);
      }
    };

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (failedChunks.includes(chunkIndex)) {
        continue;
      }

      const chunk = chunks[chunkIndex];
      if (uploadingChunks.length < maxConcurrency) {
        uploadingChunks.push(chunkIndex);
        processChunk(chunk, chunkIndex);
      } else {
        chunkQueue.push({ chunk, chunkIndex });
        await Promise.race(
          uploadingChunks.map((chunkIndex: number) => {
            return new Promise((resolve) => {
              const interval = setInterval(() => {
                if (uploadingChunks.indexOf(chunkIndex) === -1) {
                  clearInterval(interval);
                  resolve(chunkIndex);
                }
              }, 1000);
            });
          })
        );
        const nextChunk = chunkQueue.shift();
        if (nextChunk) {
          const { chunk, chunkIndex } = nextChunk;
          uploadingChunks.push(chunkIndex);
          processChunk(chunk, chunkIndex);
        }
      }
    }

    // Wait for any remaining chunks to finish uploading
    await Promise.all(
      uploadingChunks.map((chunkIndex: number) => {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (uploadingChunks.indexOf(chunkIndex) === -1) {
              clearInterval(interval);
              resolve(chunkIndex);
            }
          }, 1000);
        });
      })
    );

    if (failedChunks.length > 0) {
      for (const chunkIndex of failedChunks) {
        const chunk = chunks[chunkIndex];
        const res = await uploadChunkFile(
          chunk,
          postToken,
          totalChunks,
          chunkIndex + 1,
          fileToUpload?.name ?? ""
        );
        if (!res?.data?.result) {
          console.error(`Chunk ${chunkIndex + 1} failed to upload`);
        }
      }
    }

    setIsUploading(false);
    setProgress(0);
    setChunks([]);
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
      artwork?: string;
      title?: string;
    } = {
      title: title,
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
    if (artworkFileToUpload) {
      submittedData.artwork = artworkFileToUpload.name;
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
              <Textarea
                mt="20px"
                placeholder="URL or embedded code when media is set private"
                value={locationToEmbed}
                onChange={(e) => setDescription(e.target.value)}
              />
            )}
            {/* 
            <Box mt="10px">
              <Input
                mt="10px"
                placeholder="Enter URL"
                value={locationToEmbed}
                onChange={(e) => setLocationToEmbed(e.target.value)}
              />
            </Box>
            */}

            <Box mt="10px">
              <Input
                mt="10px"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Textarea
              mt="20px"
              placeholder="Write something about this post"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormControl mt="20px">
              <FormLabel>Release Artwork</FormLabel>
              <Input
                type="file"
                accept="image/*"
                border="0px"
                p="2px"
                ref={(ref) => (artWorkInputRef.current = ref)}
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    setReleaseArtwork(file);
                  } else {
                    setReleaseArtwork(null);
                    setArtworkFileToUpload(null);
                  }
                }}
              />
            </FormControl>
            {isUploadingArtwork ? (
              <Box>
                <Text mb="10px">Uploading {artworkFileToUpload?.name}</Text>
                <Progress hasStripe value={progressArtwork} />
              </Box>
            ) : artworkFileToUpload ? (
              <Flex alignItems="center">
                <FaTrash
                  onClick={() => {
                    setArtworkFileToUpload(null);
                    if (artWorkInputRef.current)
                      artWorkInputRef.current.value = "";
                  }}
                />
                <Text ml="10px">{artworkFileToUpload?.name}</Text>
              </Flex>
            ) : null}
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
