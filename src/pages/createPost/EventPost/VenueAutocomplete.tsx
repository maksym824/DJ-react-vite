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
import { VenueSearchItem, searchVenue } from "~/services/events";

type VenueAutocompleteProps = {
  onSelect: (venue: any) => void;
};

export default function VenueAutocomplete({
  onSelect,
}: VenueAutocompleteProps) {
  const [search, setSearch] = useState<string>("");
  const debouceSearch = useDebounce(search);
  const { isOpen, onClose, onToggle, onOpen } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const [venueList, setVenueList] = useState<VenueSearchItem[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<
    VenueSearchItem | undefined
  >(undefined);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.length === 0) {
      setSelectedVenue(undefined);
      return;
    }
    if (searchTerm.length >= 2) {
      const res = await searchVenue(searchTerm);
      if (res.data) {
        setVenueList(res.data.data as VenueSearchItem[]);
        if (!isOpen && !selectedVenue) {
          onOpen();
        }
      }
    } else {
      setVenueList([]);
    }
  };

  useEffect(() => {
    handleSearch(debouceSearch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouceSearch]);

  useEffect(() => {
    onSelect(selectedVenue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVenue]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose();
    }
  };

  const handleSelect = (option: VenueSearchItem) => {
    if (option) {
      setSearch(option.name);
      setSelectedVenue(option);
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
              {venueList.map((option) => (
                <Text
                  key={option.id}
                  cursor="pointer"
                  onClick={() => handleSelect(option)}
                  p="4px"
                  mb="4px"
                  _hover={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {option.name}
                </Text>
              ))}
              {search.length && !venueList.length && (
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
