import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Progress,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosProgressEvent } from "axios";
import { uploadFile } from "~/services/uploadFile";
import { EventPayload } from "~/services/createEvent";
import getPostToken from "~/services/getPostToken";
import { Event, PostType } from "~/types";
import Header from "~/components/Header";
import { getEventById, updateEvent } from "~/services/events";

type EventDetails = Event & EventPayload;

const EditEventPost = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const { event_id = "" } = params;
  const [currentEvent, setCurrentEvent] = useState<EventDetails | null>(null);

  const [postToken, setPostToken] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventStartTime, setEventStartTime] = useState<string>("");
  const [eventEndTime, setEventEndTime] = useState<string>("");
  const [eventVenue, setEventVenue] = useState<string>("");
  const [eventCity, setEventCity] = useState<string>("");
  const [eventArtwork, setEventArtwork] = useState<File | null>(null);
  const [eventLink, setEventLink] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artworkPreview, setArtworkPreview] = useState<string>("");

  const getEventData = async (eventID: number) => {
    try {
      const res = await getEventById(eventID);
      const { data } = res;
      if (data.length) {
        const _event = data[0] as EventDetails;
        setCurrentEvent(_event);
      }
    } catch (error) {
      console.error("Error getting event:", error);
    }
  };

  useEffect(() => {
    if (!event_id) return;
    getEventData(Number(event_id));
  }, [event_id]);

  useEffect(() => {
    if (!currentEvent) return;
    setEventName(currentEvent.event_name);
    setEventDescription(currentEvent.description);
    setEventDate(currentEvent.event_date);
    setEventStartTime(currentEvent.start_time);
    setEventEndTime(currentEvent.end_time);
    setEventVenue(currentEvent.venue);
    setEventCity(currentEvent.city);
    setEventLink(currentEvent.link_buy_tickets);
    setArtworkPreview(currentEvent.artwork_cache);
  }, [currentEvent]);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgress(percentCompleted);
  };

  const handleInitPostToken = async () => {
    const token = await getPostToken(PostType.event);
    setPostToken(token as string);
  };

  useEffect(() => {
    handleInitPostToken();
  }, []);

  const handleUploadFile = async (eventArtwork: File) => {
    setIsUploading(true);
    try {
      await uploadFile(eventArtwork, postToken, onUploadProgress);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (eventArtwork) {
      handleUploadFile(eventArtwork);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventArtwork]);

  const handleUpdateEvent = async () => {
    const payload: Partial<EventDetails> = {
      event_name: eventName,
      event_date: eventDate,
      start_time: eventStartTime,
      end_time: eventEndTime,
      description: eventDescription,
      link_buy_tickets: eventLink,
      artwork: eventArtwork?.name ?? "",
      venue: eventVenue,
      city: eventCity,
    };
    setIsLoading(true);
    try {
      const response = await updateEvent(Number(event_id), postToken, payload);
      if (response.data?.result) {
        setIsLoading(false);
        toast({
          title: "Event updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (err) {
      console.log("err", err);
    }
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
        <Flex w="100%" justifyContent="center">
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
              <Flex background="#300a6e" justifyContent="center">
                <Heading
                  color="#fff"
                  fontSize="20px"
                  display="flex"
                  alignItems="center"
                  gap="6px"
                  py="15px"
                >
                  Create Tour Date
                </Heading>
              </Flex>
              <Stack px="20px" pt="10px" pb="20px">
                <FormControl isRequired mb={4}>
                  <FormLabel>Event Name</FormLabel>
                  <Input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter name of event"
                  />
                </FormControl>

                <FormControl mb={4} isRequired>
                  <FormLabel>Event Description</FormLabel>
                  <Textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Write something about this event..."
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel>Event Date</FormLabel>
                  <Input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="Select a date"
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="time"
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="time"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel>Venue</FormLabel>
                  <Input
                    type="text"
                    placeholder="e.g. Pacha"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                  />
                </FormControl>

                <FormControl mb={4} isRequired>
                  <FormLabel>City / Location</FormLabel>
                  <Input
                    type="text"
                    placeholder="e.g. London or Ibiza"
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
                  />
                </FormControl>

                {!eventArtwork && (
                  <FormControl mb={4}>
                    <FormLabel>Artwork Preview</FormLabel>
                    <Image
                      src={"https://files.djfan.app/" + artworkPreview}
                      width="100%"
                      height="auto"
                      objectFit="cover"
                      borderRadius="10px"
                    />
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>Event Artwork</FormLabel>
                  <Input
                    ref={(ref) => (fileInputRef.current = ref)}
                    p="2px"
                    type="file"
                    accept="image/*"
                    border="0px"
                    onChange={(e) => {
                      if (e.target.files) {
                        setEventArtwork(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                {isUploading ? (
                  <Box mb={4}>
                    <Text>Uploading {eventArtwork?.name}</Text>
                    <Progress hasStripe value={progress} />
                  </Box>
                ) : eventArtwork ? (
                  <>
                    <Flex alignItems="center" mb={4}>
                      <FaTrash
                        cursor="pointer"
                        onClick={() => {
                          setEventArtwork(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                      />
                      <Text ml="10px">{eventArtwork?.name}</Text>
                    </Flex>
                  </>
                ) : null}

                <FormControl mb={4}>
                  <FormLabel>Link to book or buy tickets</FormLabel>
                  <Input
                    type="url"
                    placeholder="https://"
                    value={eventLink}
                    onChange={(e) => setEventLink(e.target.value)}
                  />
                </FormControl>

                <Button
                  type="submit"
                  background="#300a6e"
                  color="#fff"
                  fontSize="18px"
                  _hover={{ background: "#111" }}
                  height="45px"
                  isLoading={isLoading}
                  onClick={handleUpdateEvent}
                  isDisabled={
                    !eventName ||
                    !eventDescription ||
                    !eventDate ||
                    !eventVenue ||
                    !eventCity ||
                    isUploading
                  }
                >
                  UPDATE EVENT{" "}
                  <FaArrowRight fontSize="14px" style={{ marginLeft: "5px" }} />
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default EditEventPost;
