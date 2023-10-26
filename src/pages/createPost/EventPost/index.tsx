import { Box, Button, Flex } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "~/components/Header";
import EventList from "./EventList";

const EventPost = () => {
  const navigate = useNavigate();

  const handleGoCreateEvent = async () => {
    navigate("/event/create");
  };

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        minH="100vh"
        flexDirection="column"
        bg="#ececec"
        pb="50px"
      >
        <Header />
        <Flex
          w="100%"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Flex
            flexDirection="column"
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
              <Button
                type="submit"
                background="#300a6e"
                color="#fff"
                fontSize="18px"
                _hover={{ background: "#111" }}
                height="45px"
                onClick={handleGoCreateEvent}
              >
                CREATE EVENT{" "}
                <FaArrowRight fontSize="14px" style={{ marginLeft: "5px" }} />
              </Button>
            </Flex>
          </Flex>
          <Box w={{ base: "100%", sm: "500px" }}>
            <EventList />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default EventPost;
