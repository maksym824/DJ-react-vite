import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Progress,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormFooter from "~/components/FormFooter";
import { AxiosProgressEvent } from "axios";
import { uploadFile } from "~/services/uploadFile";
import createEvent, {
  EventPayload,
  // Guest,
  InviteProcess,
} from "~/services/createEvent";
import getPostToken from "~/services/getPostToken";
import { PostType } from "~/types";
import Header from "~/components/Header";
import dayjs from "dayjs";
import VenueAutocomplete from "./VenueAutocomplete";
import { VenueSearchItem } from "~/services/events";

const CreateEventPost = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [postToken, setPostToken] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventStartTime, setEventStartTime] = useState<string>("");
  const [eventEndTime, setEventEndTime] = useState<string>("");
  const [eventCity, setEventCity] = useState<string>("");
  const [eventArtwork, setEventArtwork] = useState<File | null>(null);
  const [eventLink, setEventLink] = useState<string>("");
  const [venueAddress, setVenueAddress] = useState<string>("");
  const [showVenueAddress, setShowVenueAddress] = useState<boolean>(true);
  const [selectedVenue, setSelectedVenue] = useState<
    VenueSearchItem | undefined
  >(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [numberOfGuests, setNumberOfGuests] = useState<string>("");
  const [startOfPeriod, setStartOfPeriod] = useState<string>("");
  const [endOfPeriod, setEndOfPeriod] = useState<string>("");
  const [selectedInviteProcess, setSelectedInviteProcess] =
    useState<InviteProcess>(InviteProcess.FCFS);
  const [guestListRecipient, setGuestListRecipient] = useState<string>("");
  // const [manualGuests, setManualGuests] = useState<Guest[]>([]);

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

  useEffect(() => {
    if (selectedVenue?.id) {
      setShowVenueAddress(false);
    } else {
      setShowVenueAddress(true);
    }
  }, [selectedVenue]);

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

  useEffect(() => {
    const today = dayjs();
    const defaultStartTime = today
      .add(1, "day")
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm");
    setStartOfPeriod(defaultStartTime);
  }, []);

  useEffect(() => {
    const eventDateDayjs = dayjs(eventDate);
    const defaultEndTime = eventDateDayjs
      .subtract(1, "day")
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm");

    setEndOfPeriod(defaultEndTime);
  }, [eventDate]);

  const handleCreateEvent = async () => {
    const payload: Partial<EventPayload> = {
      event_name: eventName,
      event_date: eventDate,
      start_time: eventStartTime,
      end_time: eventEndTime,
      description: eventDescription,
      link_buy_tickets: eventLink,
      artwork: eventArtwork?.name ?? "",
      city: eventCity,
      guest_invite_start: startOfPeriod,
      guest_invite_end: endOfPeriod,
      guest_invite_type: selectedInviteProcess,
      guest_invite_number: numberOfGuests,
      guest_list_receiver: guestListRecipient,
    };
    if (selectedVenue) {
      payload.venue_id = selectedVenue.id;
      payload.venue = "";
    } else {
      payload.venue = venueAddress;
    }
    setIsLoading(true);
    try {
      const response = await createEvent(payload, postToken);
      if (response.data?.result) {
        setIsLoading(false);
        toast({
          title: "Event created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/event");
      } else {
        setIsLoading(false);
        toast({
          title: "Error creating event.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
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

                <FormControl mb={4} isRequired>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="time"
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
                  />
                </FormControl>

                <FormControl mb={4} isRequired>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="time"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Venue</FormLabel>
                  <VenueAutocomplete onSelect={setSelectedVenue} />
                </FormControl>

                {showVenueAddress && (
                  <FormControl mb={4} isRequired>
                    <FormLabel>Venue Address</FormLabel>
                    <Input
                      type="text"
                      placeholder="Street, city"
                      value={venueAddress}
                      onChange={(e) => setVenueAddress(e.target.value)}
                    />
                  </FormControl>
                )}

                <FormControl mb={4} isRequired>
                  <FormLabel>City / Location</FormLabel>
                  <Input
                    type="text"
                    placeholder="e.g. London or Ibiza"
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
                  />
                </FormControl>

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

                <Accordion allowToggle mb="10px">
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight="bold"
                        >
                          Create guest list
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <FormControl isRequired mb={4}>
                        <FormLabel>Number of Guests</FormLabel>
                        <NumberInput>
                          <NumberInputField
                            placeholder="Number of Guests"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                          />
                        </NumberInput>
                      </FormControl>
                      <FormControl isRequired mb={4}>
                        <FormLabel>Start of Period (in GMT)</FormLabel>
                        <Input
                          type="datetime-local"
                          value={startOfPeriod}
                          onChange={(e) => setStartOfPeriod(e.target.value)}
                          placeholder="Select a date"
                        />
                      </FormControl>
                      <FormControl isRequired mb={4}>
                        <FormLabel>End of Period (in GMT)</FormLabel>
                        <Input
                          type="datetime-local"
                          value={endOfPeriod}
                          onChange={(e) => setEndOfPeriod(e.target.value)}
                          placeholder="Select a date"
                        />
                      </FormControl>
                      <FormControl isRequired mb={4}>
                        <FormLabel>Invite process</FormLabel>
                        <Select
                          mt="10px"
                          placeholder="Select invite process"
                          onChange={(e) =>
                            setSelectedInviteProcess(
                              e.target.value as unknown as InviteProcess
                            )
                          }
                          value={selectedInviteProcess}
                        >
                          <option value={InviteProcess.FCFS}>
                            First come First Serve
                          </option>
                        </Select>
                      </FormControl>
                      {/* 
                        This part is not ready yet
                        We will enable this feature in the next release */}
                      {/* <FormControl mb={4}>
                        <FormLabel>Manually adding guests</FormLabel>
                        <Button
                          onClick={() => {
                            setManualGuests([
                              ...manualGuests,
                              {
                                id: new Date().getMilliseconds() + 1,
                                name: "",
                                email: "",
                              },
                            ]);
                          }}
                          mb="10px"
                        >
                          Add guest
                        </Button>
                        {manualGuests.map((guest) => (
                          <Flex
                            key={guest.id}
                            alignItems="center"
                            justifyContent="space-between"
                            mb="5px"
                          >
                            <Input
                              value={guest.name}
                              onChange={(e) => {
                                const updatedGuest = manualGuests.find(
                                  (g) => g.id === guest.id
                                );
                                if (updatedGuest) {
                                  updatedGuest.name = e.target.value;
                                  setManualGuests([...manualGuests]);
                                }
                              }}
                              placeholder="Name"
                              mr="10px"
                            />
                            <Input
                              value={guest.email}
                              onChange={(e) => {
                                const updatedGuest = manualGuests.find(
                                  (g) => g.id === guest.id
                                );
                                if (updatedGuest) {
                                  updatedGuest.email = e.target.value;
                                  setManualGuests([...manualGuests]);
                                }
                              }}
                              placeholder="Email"
                            />
                            <FaTrash
                              cursor="pointer"
                              style={{ marginLeft: "10px", fontSize: "30px" }}
                              onClick={() =>
                                setManualGuests(
                                  manualGuests.filter((g) => g.id !== guest.id)
                                )
                              }
                            />
                          </Flex>
                        ))}
                      </FormControl> */}

                      <FormControl mb={4}>
                        <FormLabel>Guest list recipient</FormLabel>
                        <Input
                          type="text"
                          value={guestListRecipient}
                          onChange={(e) =>
                            setGuestListRecipient(e.target.value)
                          }
                          placeholder="Email"
                        />
                      </FormControl>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Button
                  type="submit"
                  background="#300a6e"
                  color="#fff"
                  fontSize="18px"
                  _hover={{ background: "#111" }}
                  height="45px"
                  isLoading={isLoading}
                  onClick={handleCreateEvent}
                  isDisabled={
                    !eventName ||
                    !eventDescription ||
                    !eventDate ||
                    (!selectedVenue?.id && !venueAddress) ||
                    !eventCity ||
                    !eventStartTime ||
                    !eventEndTime ||
                    !numberOfGuests
                  }
                >
                  {/* !eventLink || !eventArtwork */}
                  CREATE EVENT{" "}
                  <FaArrowRight fontSize="14px" style={{ marginLeft: "5px" }} />
                </Button>
              </Stack>
            </Flex>
            <FormFooter />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CreateEventPost;
