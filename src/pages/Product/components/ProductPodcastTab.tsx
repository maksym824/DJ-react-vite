import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
  Box,
  Text,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import FileChoices from "./FileChoices";
import {
  setProductPodcastData,
  ProductPayload,
} from "~/services/createProduct";
import { uploadChunkFile, uploadFile } from "~/services/uploadFile";
import { AxiosProgressEvent } from "axios";
import { useNavigate } from "react-router-dom";

const MAX_VIDEO_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 1Gb
const CHUNK_SIZE = 10 * 1024 * 1024; // 10Mb

type Props = {
  postToken: string;
};

const ProductPodcastTab = ({ postToken }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [releaseName, setReleaseName] = useState("");
  const [description, setDescription] = useState("");
  const [releaseArtwork, setReleaseArtwork] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [fileName, setFileName] = useState("");
  const [downloadablePodcastFile, setDownloadablePodcastFile] =
    useState<File | null>(null);

  const artWorkInputRef = useRef<HTMLInputElement | null>(null);
  const podcastInputRef = useRef<HTMLInputElement | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [progressArtwork, setProgressArtwork] = useState<number>(0);
  const [isUploadingArtwork, setIsUploadingArtwork] = useState<boolean>(false);
  const [progressPodcast, setProgressPodcast] = useState<number>(0);
  const [isUploadingPodcast, setIsUploadingPodcast] = useState<boolean>(false);

  const [artworkFileToUpload, setArtworkFileToUpload] = useState<File | null>(
    null
  );
  const [podcastFileToUpload, setPodcastFileToUpload] = useState<File | null>(
    null
  );
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [totalChunks, setTotalChunks] = useState<number>(0);

  const onUploadArtworkProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgressArtwork(percentCompleted);
  };

  const onUploadPodcastProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgressPodcast(percentCompleted);
  };

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
    if (chunks.length && podcastFileToUpload?.name) {
      uploadChunks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunks, podcastFileToUpload]);

  const uploadChunks = async () => {
    setIsUploadingPodcast(true);
    const maxConcurrency = 2;
    const chunkQueue: {
      chunk: Blob;
      chunkIndex: number;
    }[] = [];

    const uploadingChunks: number[] = [];
    const failedChunks: number[] = [];

    const processChunkPodcast = async (chunk: Blob, chunkIndex: number) => {
      try {
        const res = await uploadChunkFile(
          chunk,
          postToken,
          totalChunks,
          chunkIndex + 1,
          podcastFileToUpload?.name ?? ""
        );

        if (res?.data?.result) {
          setProgressPodcast(
            Math.round(((chunkIndex + 1) / totalChunks) * 100)
          );
        } else {
          console.error(`Podcast Chunk ${chunkIndex + 1} failed to upload`);
          failedChunks.push(chunkIndex);
        }
      } catch (error) {
        console.error(`Podcast Chunk ${chunkIndex + 1} failed to upload`);
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
        processChunkPodcast(chunk, chunkIndex);
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
          processChunkPodcast(chunk, chunkIndex);
        }
      }
    }

    // Wait for any remaining podcast chunks to finish uploading
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
          podcastFileToUpload?.name ?? ""
        );
        if (!res?.data?.result) {
          console.error(`Podcast Chunk ${chunkIndex + 1} failed to upload`);
        }
      }
    }

    setIsUploadingPodcast(false);
    setProgressPodcast(0);
  };

  const handleUploadPodcast = async (file: File) => {
    setIsUploadingPodcast(true);
    try {
      if (!file || file.size > MAX_VIDEO_FILE_SIZE) return;
      setPodcastFileToUpload(file);
      if (file.size <= CHUNK_SIZE) {
        const res = await uploadFile(file, postToken, onUploadPodcastProgress);
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
      console.error("Error uploading podcast:", error);
    } finally {
      setIsUploadingPodcast(false);
      setProgressPodcast(0);
    }
  };

  useEffect(() => {
    if (downloadablePodcastFile) {
      handleUploadPodcast(downloadablePodcastFile);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadablePodcastFile]);

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
    const payload: Partial<ProductPayload> = {
      name: releaseName,
      description,
      artwork: releaseArtwork?.name ?? "",
      price: price.toString(),
      filename: fileName,
      download: downloadablePodcastFile?.name ?? "",
    };

    try {
      const res = await setProductPodcastData(payload, postToken);
      if (res.data?.result) {
        toast({
          description: "Product created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/product", {
          state: {
            reload: true,
          },
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Stack px="20px" pb="20px">
      <Text fontWeight="bold" fontSize={20}>
        Create Podcast Product
      </Text>
      <FormControl isRequired mb={4}>
        <FormLabel>Product Name</FormLabel>
        <Input
          type="text"
          value={releaseName}
          placeholder="Name of Podcast Product"
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

      <FormControl>
        {/*isRequired*/}
        <FormLabel>Product Artwork/Picture</FormLabel>
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
              if (artWorkInputRef.current) artWorkInputRef.current.value = "";
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
          <NumberInputField placeholder="e.g. 2.00" textAlign={"right"} />
        </NumberInput>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Downloadable File Name</FormLabel>
        <Input
          type="text"
          placeholder="e.g. my-podcast-name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Downloadable Podcast File</FormLabel>
        <Input
          type="file"
          accept=".mp4,.mov"
          border="0px"
          p="2px"
          ref={(ref) => (podcastInputRef.current = ref)}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > MAX_VIDEO_FILE_SIZE) {
                e.target.value = "";
                return;
              }
              setDownloadablePodcastFile(file);
            } else {
              setDownloadablePodcastFile(null);
              setPodcastFileToUpload(null);
            }
          }}
        />
      </FormControl>

      {isUploadingPodcast ? (
        <>
          <Box>
            <Text mb="10px">Uploading {podcastFileToUpload?.name}</Text>
            <Text as="span" paddingLeft="10px">
              {" "}
              <Spinner />{" "}
            </Text>
            <Progress hasStripe value={progressPodcast} />
          </Box>
        </>
      ) : podcastFileToUpload ? (
        <Flex alignItems="center">
          <FaTrash
            onClick={() => {
              setPodcastFileToUpload(null);
              if (podcastInputRef.current) podcastInputRef.current.value = "";
            }}
          />
          <Text ml="10px">{podcastFileToUpload?.name}</Text>
        </Flex>
      ) : null}

      <FileChoices
        allowedFileTypes={["mp3", "mp4", "mov", "zip", "gzip", "rar"]}
      />

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
          /* !releaseArtwork || */
          !downloadablePodcastFile ||
          isUploadingArtwork ||
          isUploadingPodcast
        }
      >
        {/* !releaseDate || !recordLabel || */}
        CREATE PRODUCT{" "}
        <FaArrowRight fontSize="14px" style={{ marginLeft: "5px" }} />
      </Button>
    </Stack>
  );
};

export default ProductPodcastTab;
