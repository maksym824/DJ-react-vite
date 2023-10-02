import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Img,
  Button,
} from "@chakra-ui/react";
import Header from "~/components/Header";
import apiClient from "~/services/api-client";
import { usePartnerArtists } from "~/services/partners/getPartnerArtists";
import { Artist } from "~/types";

const Partners = () => {
  const { data: artists } = usePartnerArtists();
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
      <Flex w="100%" justifyContent="center">
        {artists && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Profile Picture</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {parsedArtists.map((artist: Artist) => (
                  <Tr key={artist.id}>
                    <Td>{artist.display_name}</Td>
                    <Td>
                      <Img
                        src={`https://files.djfan.app/${
                          artist?.profile_picture ?? ""
                        }`}
                        h="full"
                        w="100%"
                        maxH="100px"
                        objectFit="cover"
                      />
                      {/* {artist.profile_picture} */}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="purple"
                        size="sm"
                        onClick={async () => {
                          const res = await apiClient.get(
                            `/dj/loginas/${artist.user_id}`
                          );
                          const { data } = res;
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
