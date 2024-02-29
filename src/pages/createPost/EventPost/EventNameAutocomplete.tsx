import {
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { EventSearchItem, searchEvent } from "~/services/events";

type EventNameAutoCompleteProps = {
  onSelect: (event: EventSearchItem | undefined) => void;
};

export default function EventNameAutoComplete({
  onSelect,
}: EventNameAutoCompleteProps) {
  const [search, setSearch] = useState<string>("");
  const debouceSearch = useDebounce(search);
  const { isOpen, onClose, onToggle, onOpen } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const [eventList, setEventList] = useState<EventSearchItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<
    EventSearchItem | undefined
  >(undefined);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.length === 0) {
      setSelectedEvent(undefined);
      return;
    }
    if (searchTerm.length >= 2) {
      const res = await searchEvent(searchTerm);
      if (res.data) {
        setEventList(res.data.data as EventSearchItem[]);
        if (!isOpen && !selectedEvent) {
          onOpen();
        }
      }
    } else {
      setEventList([]);
    }
  };

  useEffect(() => {
    handleSearch(debouceSearch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouceSearch]);

  useEffect(() => {
    onSelect(selectedEvent);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose();
    }
  };

  const handleSelect = (option: EventSearchItem) => {
    if (option) {
      setSearch(option.event_name);
      setSelectedEvent(option);
      onClose();
    }
  };

  return (
    <Flex gap={5} w="100%">
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <InputGroup w="100%" onClick={onToggle}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="on-accent" boxSize="4" />
            </InputLeftElement>
            <Input
              ref={inputRef}
              placeholder="Search"
              variant="filled"
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                backgroundColor: "white",
              }}
              border="1px solid #E2E8F0"
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent w="100%" display={search.length ? "block" : "none"}>
          <PopoverBody
            w={{
              base: "calc(100vw - 70px)",
              md: "calc(500px - 20px - 20px)",
            }}
          >
            <Flex direction="column">
              {eventList.map((option) => (
                <Text
                  key={option.event_name}
                  cursor="pointer"
                  onClick={() => handleSelect(option)}
                  p="4px"
                  mb="4px"
                  _hover={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {option.event_name}
                </Text>
              ))}
              {search.length && !eventList.length && (
                <Text cursor="pointer" p="4px" mb="4px">
                  No search results
                </Text>
              )}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
