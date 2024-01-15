import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { timeAgo } from "~/utils";
import { useUserData } from "~/services/settings/userData";
import { Event } from "~/types";
import {
  Button,
  Flex,
  Box,
  Text,
  Spinner,
  VStack,
  Image,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { deleteEvent, useEvent } from "~/services/events";
import { socket } from "~/services/socket";

const EventList = () => {
  const { data: userData } = useUserData();
  const toast = useToast();

  const pageSize = 10;
  const {
    data: events,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useEvent({ pageSize });
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const nonPublishedEvents = events?.pages?.flat()?.filter((x) => !x.publish);

  useEffect(() => {
    setTimeout(() => {
      console.log("refetching");
      refetch();
    }, 5 * 1000 * 60); // refetch the list after 15 minutes
  }, [refetch]);

  useEffect(() => {
    const shouldConnectSocket = (nonPublishedEvents?.length ?? 0) > 0;
    if (!shouldConnectSocket) {
      if (!socket.connected) return;
      socket.disconnect();
      return;
    }

    // we disabled autoConnect so we can connect only when some events are not published
    socket.connect();

    function onConnect() {
      console.log("connected");
      const eventIDs = nonPublishedEvents?.map((x) => x.id);

      eventIDs?.forEach((eventID) => {
        console.log("emit event id in process", eventID);
        console.log("key", userData?.user_key + "|" + eventID?.toString());
        socket.emit(
          "event:add",
          userData?.user_key + "|" + eventID?.toString()
        );
      });
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    function onEventReady(value: string) {
      console.log("onEventReady", value);
      refetch();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("event:ready", onEventReady);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("event:ready", onEventReady);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonPublishedEvents]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      const resDel = await deleteEvent(selectedEvent.id);
      if (!resDel.data.result) {
        toast({
          title: "Error deleting event",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Event deleted!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        await refetch();
      }
    } catch (err) {
      toast({
        title: "Error deleting event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={(events?.pages?.length ?? 0) * pageSize}
        next={handleLoadMore}
        hasMore={hasNextPage ?? false}
        loader={<></>}
        endMessage={
          <>
            {(events?.pages ?? [])?.flat()?.length > 0 ? (
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                All events displayed
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
          mt="30px"
        >
          <Box p="4" bg="white" borderRadius="15px" w="100%" textAlign="center">
            <Text fontWeight="700">List of events</Text>
          </Box>
          {events?.pages?.map((page: Event[], index: number) => {
            return (
              <Box key={index} w="100%">
                {page.map((event: Event) => {
                  return (
                    <Box
                      key={event.id}
                      bg="white"
                      w="100%"
                      mb="40px"
                      p="8"
                      mt="10px"
                      borderRadius="15px"
                    >
                      <Box>
                        <Image
                          src={event.artwork}
                          fallbackSrc={userData?.profile_picture}
                          alt="event-image"
                          width="100%"
                          height="auto"
                          borderRadius="15px"
                          mt="10px"
                        />
                        <Flex alignItems="center" mt="10px">
                          <Text>{timeAgo(event.created_at)}</Text>
                          <Text fontStyle={"italic"} paddingLeft="20px">
                            {event?.publish === 0 ? (
                              <>
                                <Spinner size="xs" speed="1.1s" />
                                Processing
                              </>
                            ) : (
                              "Published"
                            )}
                          </Text>
                        </Flex>
                        <Text>
                          Event Name: <b>{event.id}</b>
                        </Text>
                        <Text>
                          Name: <b>{event.event_name}</b>
                        </Text>
                      </Box>
                      <VStack>
                        <Button
                          mt="10px"
                          w="100%"
                          color="#fff"
                          colorScheme="red"
                          onClick={() => {
                            setSelectedEvent(event);
                            onOpen();
                          }}
                        >
                          <Text>Delete</Text>
                        </Button>
                        <Button
                          mt="10px"
                          w="100%"
                          onClick={() => {
                            navigate(`/event/edit/${event.id}`);
                          }}
                        >
                          <Text>Edit</Text>
                        </Button>
                      </VStack>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Flex>
      </InfiniteScroll>

      {selectedEvent && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Post: {selectedEvent.event_name}
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={async () => {
                    await handleDeleteEvent();
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
      )}
    </>
  );
};

export default EventList;
