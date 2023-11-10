import {
  Flex,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Img,
  Button,
  Box,
} from "@chakra-ui/react";
/*
  Thead,
  Th,
 */
import Header from "~/components/Header";
import apiClient from "~/services/api-client";
import { usePartnerArtists } from "~/services/partners/getPartnerArtists";
import { useUserAccount } from "~/services/settings/userAccount";
import { Artist } from "~/types";
import SearchDJ from "./SearchDJ";
// import { useEffect } from "react";

const Partners = () => {
  const { data: artists } = usePartnerArtists();
  const { data: userAccount } = useUserAccount();
  const isAdmin = userAccount?.admin || userAccount?.me?.admin || false;
  // Because the data is an object, we need to convert it to an array
  const parsedArtists = Object.values(artists || {}) as Artist[];

  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      flexDirection="column"
      bg="#ececec"
      pb="50px"
    >
      <Header />

      <Flex w="100%" h="100%" justifyContent="center">
        {isAdmin && (
          <Box mt="15px">
            <SearchDJ />
          </Box>
        )}
      </Flex>

      <Flex w="100%" h="100%" justifyContent="center">
        {artists && artists.result == false && (
          <Text fontSize="3xl" paddingTop={12}>
            No partners connected yet.
          </Text>
        )}

        {artists && artists.result != false && (
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                {parsedArtists.map((artist: Artist) => (
                  <Tr key={artist.id}>
                    <Td>
                      <Img
                        src={`https://files.djfan.app/${
                          artist?.profile_picture ?? ""
                        }`}
                        h="150px"
                        w="150px"
                        objectFit="cover"
                        borderRadius={5}
                      />
                      {/* {artist.profile_picture} */}
                    </Td>
                    <Td>
                      <div style={{ paddingBottom: "10px" }}>
                        {artist.display_name}
                      </div>
                      <Button
                        colorScheme="purple"
                        size="sm"
                        onClick={async () => {
                          const res = await apiClient.get(
                            `/dj/loginas/${artist.user_id}`
                          );
                          const { data } = res;
                          window.location.href = "/";
                          if (data.result) {
                            console.log(data.result);
                          } else {
                            console.log(data.message);
                          }
                        }}
                      >
                        Login as
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>
    </Flex>
  );
};

export default Partners;
