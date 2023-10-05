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
import { DJSearch } from "~/types";
import { searchDJ } from "~/services/partners/getDJSearch";
import apiClient from "~/services/api-client";

export default function SearchDJ() {
  const [search, setSearch] = useState<string>("");
  const [userList, setUserList] = useState<DJSearch[]>([]);
  const debouceSearch = useDebounce(search);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (debouceSearch.length > 2) {
      searchDJ(debouceSearch).then((res: DJSearch[]) => {
        setUserList(res);
      });
    } else {
      setUserList([]);
    }
  }, [debouceSearch]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose();
    }
  };

  const handleSelect = async (djUser: DJSearch) => {
    try {
      const res = await apiClient.get(`/dj/loginas/${djUser.user_key}`);
      const { data } = res;
      if (data.result) {
        onClose();
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex gap={5}>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <InputGroup
            w={{ base: "100%", sm: "150px", md: "200px" }}
            onClick={onToggle}
          >
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="on-accent" boxSize="6" />
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
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent
          w={{ base: "100%", sm: "150px", md: "200px" }}
          display={search.length ? "block" : "none"}
        >
          <PopoverBody>
            <Flex direction="column">
              {userList?.map((DJUser, index) => (
                <Text
                  key={index}
                  cursor="pointer"
                  _hover={{
                    backgroundColor: "gray.200",
                  }}
                  onClick={async () => await handleSelect(DJUser)}
                >
                  {DJUser.display_name}
                </Text>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
