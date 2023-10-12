import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
  Box,
  Text,
  Progress,
} from "@chakra-ui/react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import Header from "~/components/Header";
import FileChoices from "./components/FileChoices";
import setProductData, { ProductPayload } from "~/services/createProduct";
import { uploadChunkFile, uploadFile } from "~/services/uploadFile";
import { AxiosProgressEvent } from "axios";
import getPostToken from "~/services/getPostToken";
import { PostType } from "~/types";
import { useNavigate } from "react-router-dom";

const MAX_AUDIO_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1Gb
const CHUNK_SIZE = 10 * 1024 * 1024; // 10Mb

export default function Product() {
  const navigate = useNavigate();
  const toast = useToast();
  const [postToken, setPostToken] = useState<string>("");
  const [releaseName, setReleaseName] = useState("");
  const [description, setDescription] = useState("");
  const [releaseArtwork, setReleaseArtwork] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [recordLabel, setRecordLabel] = useState("");
  const [featuredArtists, setFeaturedArtists] = useState("");
  const [fileName, setFileName] = useState("");
  const [downloadableTrackFile, setDownloadableTrackFile] =
    useState<File | null>(null);

  const artWorkInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [progressArtwork, setProgressArtwork] = useState<number>(0);
  const [isUploadingArtwork, setIsUploadingArtwork] = useState<boolean>(false);
  const [progressAudio, setProgressAudio] = useState<number>(0);
  const [isUploadingAudio, setIsUploadingAudio] = useState<boolean>(false);

  const [artworkFileToUpload, setArtworkFileToUpload] = useState<File | null>(
    null
  );
  const [audioFileToUpload, setAudioFileToUpload] = useState<File | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const currentChunk = useRef<number>(0);
  const [totalChunks, setTotalChunks] = useState<number>(0);

  const onUploadArtworkProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgressArtwork(percentCompleted);
  };

  const onUploadAudioProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgressAudio(percentCompleted);
  };

  const handleInitPostToken = async () => {
    const token = await getPostToken(PostType.product);
    setPostToken(token as string);
  };

  useEffect(() => {
    handleInitPostToken();
  }, []);

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

  useEffect(() => {
    if (chunks.length && audioFileToUpload?.name) {
      uploadChunks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunks, audioFileToUpload]);

  const uploadChunks = async () => {
    setIsUploadingAudio(true);
    if (currentChunk?.current < totalChunks) {
      const chunk = chunks[currentChunk.current];

      try {
        await uploadChunkFile(
          chunk,
          postToken,
          totalChunks,
          currentChunk.current + 1,
          audioFileToUpload?.name ?? ""
        );
        // Chunk uploaded successfully, move to the next chunk
        currentChunk.current++;
        setProgressAudio(
          Math.round((currentChunk.current / totalChunks) * 100)
        );
        await uploadChunks(); // Recursively upload the next chunk
      } catch (error) {
        console.error("Error uploading chunk:", error);
      }
    } else {
      setIsUploadingAudio(false);
      setProgressAudio(0);
    }
  };

  const handleUploadAudio = async (file: File) => {
    setIsUploadingAudio(true);
    try {
      if (!file || file.size > MAX_AUDIO_FILE_SIZE) return;
      setAudioFileToUpload(file);
      if (file.size <= CHUNK_SIZE) {
        const res = await uploadFile(file, postToken, onUploadAudioProgress);
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
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      setIsUploadingAudio(false);
      setProgressAudio(0);
    }
  };

  useEffect(() => {
    if (downloadableTrackFile) {
      handleUploadAudio(downloadableTrackFile);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadableTrackFile]);

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

  const handleSubmit = async () => {
    setIsCreating(true);
    const payload: ProductPayload = {
      name: releaseName,
      description,
      artwork: releaseArtwork?.name ?? "",
      price: price.toString(),
      genre,
      release_date: releaseDate,
      label: recordLabel,
      artist: featuredArtists,
      filename: fileName,
      download: downloadableTrackFile?.name ?? "",
    };

    try {
      const res = await setProductData(payload, postToken);
      if (res.data?.result) {
        toast({
          description: "Product created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/create");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      flexDirection="column"
      bg="#ececec"
      pb="50px"
    >
      <Header />
      <Flex w="100%" justifyContent="center">
        <Flex
          flexDirection="column"
          gap="35px"
          w="100%"
          maxW="1000px"
          pt="25px"
          px="15px"
          alignItems="center"
        >
          <Flex
            gap="10px"
            bg="#fff"
            flexDirection="column"
            w={{ base: "100%", sm: "500px" }}
            borderRadius="10px"
            overflow="hidden"
          >
            <Flex background="#300a6e" justifyContent="center">
              <Heading
                color="#fff"
                fontSize="20px"
                display="flex"
                alignItems="center"
                gap="6px"
                py="15px"
              >
                Create Product
              </Heading>
            </Flex>
            <Stack px="20px" pt="10px" pb="20px">
              <FormControl isRequired mb={4}>
                <FormLabel>Release Name</FormLabel>
                <Input
                  type="text"
                  value={releaseName}
                  placeholder="Name of Release / Track"
                  onChange={(e) => setReleaseName(e.target.value)}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  placeholder="Write something about this release"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
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

              <FormControl isRequired mb={4}>
                <FormLabel>Price ($ USD)</FormLabel>
                <NumberInput
                  value={price}
                  onChange={(value) => setPrice(value)}
                  precision={2}
                >
                  <NumberInputField
                    placeholder="e.g. 2.00"
                    textAlign={"right"}
                  />
                </NumberInput>
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Genre</FormLabel>
                <Input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="e.g. Tech House"
                />
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Release Date</FormLabel>
                <Input
                  type="date"
                  value={releaseDate}
                  placeholder="Select a date"
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Record Label</FormLabel>
                <Input
                  type="text"
                  placeholder="Name of Record Label"
                  value={recordLabel}
                  onChange={(e) => setRecordLabel(e.target.value)}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Featured Artists</FormLabel>
                <Input
                  type="text"
                  placeholder="All Featured Artists"
                  value={featuredArtists}
                  onChange={(e) => setFeaturedArtists(e.target.value)}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Downloadable File Name</FormLabel>
                <Input
                  type="text"
                  placeholder="e.g. song-name.wav"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Downloadable Track File</FormLabel>
                <Input
                  type="file"
                  accept=".mp3"
                  border="0px"
                  p="2px"
                  ref={(ref) => (audioInputRef.current = ref)}
                  onChange={(e) => {
                    if (e.target.files) {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > MAX_AUDIO_FILE_SIZE) {
                        e.target.value = "";
                        return;
                      }
                      setDownloadableTrackFile(file);
                    } else {
                      setDownloadableTrackFile(null);
                      setAudioFileToUpload(null);
                    }
                  }}
                />
              </FormControl>

              {isUploadingAudio ? (
                <Box>
                  <Text mb="10px">Uploading {audioFileToUpload?.name}</Text>
                  <Progress hasStripe value={progressAudio} />
                </Box>
              ) : audioFileToUpload ? (
                <Flex alignItems="center">
                  <FaTrash
                    onClick={() => {
                      setAudioFileToUpload(null);
                      if (audioInputRef.current)
                        audioInputRef.current.value = "";
                    }}
                  />
                  <Text ml="10px">{audioFileToUpload?.name}</Text>
                </Flex>
              ) : null}

              <FileChoices />

              <Button
                mt={4}
                type="submit"
                background="#300a6e"
                color="#fff"
                fontSize="18px"
                _hover={{ background: "#111" }}
                height="45px"
                isLoading={isCreating}
                onClick={handleSubmit}
                isDisabled={
                  !releaseName ||
                  !releaseArtwork ||
                  !price ||
                  !genre ||
                  !releaseDate ||
                  !recordLabel ||
                  !downloadableTrackFile ||
                  isUploadingArtwork ||
                  isUploadingAudio
                }
              >
                CREATE PRODUCT{" "}
                <FaArrowRight fontSize="14px" style={{ marginLeft: "5px" }} />
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
