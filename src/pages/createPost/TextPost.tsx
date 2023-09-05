import { Box, Button, Flex, Select, Text, Textarea } from "@chakra-ui/react";
import Header from "../../components/Header";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getPostToken from "../../services/getPostToken";
import { AccessLevelType, PostType } from "../../types";
import setPostDataVideo from "../../services/createVideoPost";
import { TbNews } from "react-icons/tb";

const TextPost = () => {
  const navigate = useNavigate();
  const [postToken, setPostToken] = useState<string>("");
  const [selectedPrivacy, setSelectedPrivacy] = useState<
    AccessLevelType | undefined
  >(undefined);
  const [description, setDescription] = useState<string>("");

  const handleInitPostToken = async () => {
    const token = await getPostToken(PostType.image);
    setPostToken(token as string);
  };

  useEffect(() => {
    handleInitPostToken();
  }, []);

  const handlePostImage = async () => {
    const submittedData: {
      body: string;
      accesslevel_id: AccessLevelType;
    } = {
      body: description,
      accesslevel_id: selectedPrivacy!,
    };
    try {
      const response = await setPostDataVideo(submittedData, postToken);
      console.log("data", response);
      // navigate("/");
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
            <TbNews />
            <Text fontWeight="bold" ml={2}>
              Create Text Post
            </Text>
          </Flex>
          <Flex grow={1} flexDirection="column" bg="white" color="black" p="2">
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
            {selectedPrivacy && description ? (
              <Button mt="20px" colorScheme="purple" onClick={handlePostImage}>
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

export default TextPost;
