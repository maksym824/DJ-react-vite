import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
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
import { uploadFile } from "../../services/uploadFile";
import { AxiosProgressEvent } from "axios";
import { AccessLevelType, PostType, TypeOfImagePost } from "../../types";
import setPostData from "~/services/setPostData";
import Cropper from "react-easy-crop";
import getCroppedImg from "~/utils/cropImage";
import { blobToFile } from "~/utils/blobToFile";

type Preview = {
  id: string;
  name: string;
  preview: string;
};

const ImagePost = () => {
  const [typeOfImagePost, setTypeOfImagePost] = useState<TypeOfImagePost>(
    TypeOfImagePost.SINGLE
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
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
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<Preview | undefined>(
    undefined
  );
  const [preview, setPreviews] = useState<Preview[]>([]);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // eslint-disable-next-line
  // @ts-ignore
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!selectedPreview || !croppedAreaPixels) {
      return;
    }
    try {
      const croppedImage = await getCroppedImg(
        selectedPreview.preview,
        croppedAreaPixels,
        rotation
      );
      setPreviews((prev) =>
        prev.map((x) =>
          x.name === selectedPreview.name
            ? { ...x, preview: croppedImage as string }
            : x
        )
      );
      setIsUploading(true);
      try {
        const res = await uploadFile(
          blobToFile(croppedImage as Blob, selectedPreview.name),
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
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      } finally {
        setIsUploading(false);
        setRotation(0);
        setSelectedPreview(undefined);
        setShowModalEdit(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

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

  useEffect(() => {
    if (fileRejections.length) {
      if (typeOfImagePost === TypeOfImagePost.SINGLE) {
        toast({
          description: "Only one file is allowed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          description:
            "Please upload only these accepted file types: png, jpg, jpeg, webp",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileRejections]);

  const handleUpload = async () => {
    const isUploadingMultipleFiles =
      typeOfImagePost === TypeOfImagePost.MULTIPLE;

    const noDuplicateFiles = acceptedFiles.filter(
      (x) => !uploadedFiles.includes(x.name)
    );

    if (noDuplicateFiles.length === 0) {
      toast({
        description: "File already uploaded",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (
      isUploadingMultipleFiles &&
      noDuplicateFiles.length !== acceptedFiles.length
    ) {
      toast({
        description: "Some files are already uploaded and will be skipped",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    setFileToUpload(noDuplicateFiles);
    setPreviews((preview) => [
      ...preview,
      ...noDuplicateFiles.map((x) => ({
        id: x.name,
        name: x.name,
        preview: URL.createObjectURL(x),
      })),
    ]);

    setIsUploading(true);
    try {
      for (let i = 0; i < noDuplicateFiles.length; i++) {
        const res = await uploadFile(
          noDuplicateFiles[i],
          postToken,
          isUploadingMultipleFiles ? undefined : onUploadProgress
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
        if (isUploadingMultipleFiles) {
          setProgress((i / noDuplicateFiles.length) * 100);
        }
        setUploadedFiles((prev) => [...prev, noDuplicateFiles[i].name]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleSaveImagePost = async () => {
    const submittedData: {
      body: string;
      accesslevel_id: AccessLevelType;
      files?: string[];
    } = {
      body: description,
      accesslevel_id: selectedPrivacy!,
      files: uploadedFiles,
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
      <Box height="100%">
        <Flex flexDirection={"column"} height="100%" pb="100px">
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
          <Flex grow={1} flexDirection="column" bg="white" color="black" p="5">
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
                  setUploadedFiles([]);
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
                  setUploadedFiles([]);
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
              {uploadedFiles ? (
                <>
                  {uploadedFiles?.map((fileName, index) => {
                    const foundPreview = preview?.find(
                      (x) => x.name === fileName
                    );
                    const currentPreviewURL = foundPreview?.preview;
                    return (
                      <Flex flexDirection="column" key={index}>
                        <Flex alignItems="center" mt="10px">
                          <FaTrash
                            onClick={() => {
                              setUploadedFiles((prev) =>
                                prev.filter((x) => x !== fileName)
                              );
                              setPreviews(
                                (prev) =>
                                  prev?.filter((x) => x.name !== fileName) ?? []
                              );
                            }}
                            cursor="pointer"
                          />
                          <Text ml="10px">{fileName}</Text>
                        </Flex>
                        {currentPreviewURL && (
                          <Flex flexDirection="column">
                            <Text>Preview</Text>
                            <Image
                              my="20px"
                              src={currentPreviewURL}
                              alt="preview"
                              width="200px"
                              height="auto"
                            />
                            <Button
                              onClick={() => {
                                setSelectedPreview(foundPreview);
                                setShowModalEdit(true);
                              }}
                              w="200px"
                            >
                              Edit
                            </Button>
                          </Flex>
                        )}
                      </Flex>
                    );
                  })}
                </>
              ) : null}
              {isUploading ? (
                <>
                  {fileToUpload?.map((file, index) => (
                    <Box mt="10px" key={index}>
                      <Text mb="10px">Uploading {file?.name}</Text>
                    </Box>
                  ))}
                  <Progress hasStripe value={progress} />
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
                onClick={handleSaveImagePost}
              >
                Post
              </Button>
            ) : null}
          </Flex>
        </Flex>
        {selectedPreview && (
          <Modal
            isOpen={showModalEdit}
            onClose={() => {
              setRotation(0);
              setSelectedPreview(undefined);
              setShowModalEdit(false);
            }}
            size="xl"
            isCentered
          >
            <ModalOverlay />
            <ModalContent p={5}>
              <ModalBody>
                <Text textAlign="center" mb="20px">
                  Edit image
                </Text>
                <Box
                  height={{
                    base: "200px",
                    md: "400px",
                  }}
                  position="relative"
                >
                  <Cropper
                    image={selectedPreview.preview}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    showGrid={false}
                    objectFit="cover"
                  />
                </Box>
                <Flex
                  mt="20px"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Button
                    onClick={() => {
                      if (rotation === 0) {
                        return;
                      }
                      setRotation(rotation - 90);
                    }}
                  >
                    Rotate Left
                  </Button>
                  <Button
                    onClick={() => {
                      if (rotation === 360) {
                        return;
                      }
                      setRotation(rotation + 90);
                    }}
                  >
                    Rotate Right
                  </Button>
                </Flex>
                <Flex>
                  <Button
                    onClick={showCroppedImage}
                    mt="20px"
                    w="100%"
                    colorScheme="purple"
                    isLoading={isUploading}
                  >
                    Save Change
                  </Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Box>
      <Box
        as="nav"
        role="navigation"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
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
