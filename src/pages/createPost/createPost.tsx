import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Select,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "~/components/Header";
import { deletePost, updatePost, usePosts } from "~/services/posts";
import { AccessLevelType, Post } from "~/types";
import { timeAgo } from "~/utils";

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const CreatePost = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      flexDirection="column"
      bg="#111"
      pb="50px"
    >
      <Header />
      <Flex w="100%" justifyContent="center">
        <Flex
          flexDirection="column"
          gap="25px"
          w="100%"
          maxW="600px"
          pt="25px"
          px="15px"
        >
          <Text
            color="#fff"
            lineHeight="1em"
            fontSize="28px"
            fontWeight="600"
            textAlign="center"
            w="100%"
          >
            Create a new post
          </Text>
          <Flex h="100%" justifyContent="space-evenly" wrap="wrap" gap="20px">
            {CTAButtons.map((box, index) => (
              <Link key={index} href={box.link} w={{ base: "45%", md: "30%" }}>
                <VStack bg="#fff" py="20px" gap="10px" borderRadius="15px">
                  <Image width="40px" src={box.imageUrl} />
                  <Text fontSize="20px" color="#111" fontWeight="600">
                    {box.name}
                  </Text>
                </VStack>
              </Link>
            ))}
          </Flex>
          <Box>
            <Posts />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CTAButtons = [
  {
    id: 1,
    name: "Image Post",
    imageUrl: "https://media.djfan.app/images/imagepost.png",
    link: "/create/image",
  },
  {
    id: 2,
    name: "Video Post",
    imageUrl: "https://media.djfan.app/images/videopost.png",
    link: "/create/video",
  },
  {
    id: 3,
    name: "Audio Post",
    imageUrl: "https://media.djfan.app/images/audiopost.png",
    link: "/create/audio",
  },
  {
    id: 4,
    name: "Event",
    link: "/create/event",
    imageUrl: "https://media.djfan.app/images/tourdate.png",
  },
  {
    id: 5,
    name: "New Product",
    imageUrl: "https://media.djfan.app/images/product.png",
    link: "/product",
  },
  {
    id: 6,
    name: "Text Post",
    imageUrl: "https://media.djfan.app/images/textpost.png",
    link: "/create/text",
  },
];

const Posts = () => {
  const pageSize = 10;
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = usePosts({ pageSize });
  const [currentPostToEdit, setCurrentPostToEdit] = useState<Post | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleDeletePost = async () => {
    if (!currentPostToEdit) return;
    await deletePost(currentPostToEdit.post_id);
    await refetch();
  };

  return (
    <>
      <InfiniteScroll
        dataLength={(posts?.pages.length ?? 0) * pageSize}
        next={handleLoadMore}
        hasMore={hasNextPage ?? false}
        loader={<></>}
        endMessage={
          <>
            {(posts?.pages ?? []).flat().length > 0 ? (
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                All posts displayed
              </Text>
            ) : null}
          </>
        }
      >
        <Flex
          w="100%"
          flexDirection="column"
          justifyContent="center"
          align="center"
          m="auto"
          p="0px"
          gap="20px"
          pb="50px"
          mt="30px"
        >
          <Box p="4" bg="white" borderRadius="15px" w="100%" textAlign="center">
            <Text fontWeight="700">List of posts</Text>
          </Box>
          {posts?.pages.map((page: Post[], index: number) => (
            <Box key={index} w="100%">
              {page.map((post: Post) => {
                return (
                  <Box
                    key={post.post_id}
                    bg="white"
                    w="100%"
                    mb="40px"
                    p="8"
                    mt="10px"
                    borderRadius="15px"
                  >
                    <Box>
                      {currentPostToEdit?.post_id === post?.id
                        ? timeAgo(currentPostToEdit.created_at)
                        : timeAgo(post.created_at)}
                    </Box>
                    <Textarea
                      mt="10px"
                      value={
                        currentPostToEdit?.post_id === post?.id
                          ? currentPostToEdit?.body
                          : post.body
                      }
                      onChange={(e) => {
                        setCurrentPostToEdit({
                          ...post,
                          body: e.target.value,
                        });
                      }}
                    />
                    <Select
                      mt="10px"
                      placeholder="Select privacy option"
                      value={
                        currentPostToEdit?.post_id === post?.id
                          ? currentPostToEdit?.accesslevel_id
                          : post.accesslevel_id
                      }
                      onChange={(e) => {
                        setCurrentPostToEdit({
                          ...post,
                          accesslevel_id: e.target
                            .value as unknown as AccessLevelType,
                        });
                      }}
                    >
                      <option value={AccessLevelType.EVERYONE}>Everyone</option>
                      <option value={AccessLevelType.GOLD}>GOLD</option>
                      <option value={AccessLevelType.VIP}>VIP</option>
                    </Select>
                    <VStack>
                      <Button
                        mt="10px"
                        w="100%"
                        color="#fff"
                        colorScheme="red"
                        onClick={() => {
                          setCurrentPostToEdit(post);
                          onOpen();
                        }}
                      >
                        <Text>Delete</Text>
                      </Button>
                      {currentPostToEdit?.post_id === post?.id ? (
                        <Button
                          mt="10px"
                          w="100%"
                          colorScheme="pink"
                          bgColor="rgb(191, 40, 241)"
                          color="#fff"
                          onClick={async () => {
                            try {
                              await updatePost(post.post_id, {
                                body: currentPostToEdit.body,
                                accesslevel_id:
                                  currentPostToEdit.accesslevel_id,
                              });
                              await refetch();
                            } catch (err) {
                              console.log(err);
                            }
                            setCurrentPostToEdit(null);
                          }}
                        >
                          <Text>Save</Text>
                        </Button>
                      ) : null}
                      <Button
                        mt="10px"
                        w="100%"
                        onClick={() => {
                          window.open(`https://djfan.app/feed`, "_blank");
                        }}
                      >
                        <Text>View</Text>
                      </Button>
                    </VStack>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Flex>
      </InfiniteScroll>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await handleDeletePost();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CreatePost;
