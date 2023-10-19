import {
  Avatar,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  Heading,
  Stack,
} from "@chakra-ui/react";
import ViewConnectedAccount from "./ViewConnectedAccount";

export default function ConnectedAccounts() {
  return (
    <Stack gap="15px">
      <Heading fontSize="24px" alignSelf="flex-start">
        Connected Accounts
      </Heading>
      <Flex
        bg="#ffffff"
        borderRadius="10px"
        overflow="hidden"
        border="1px solid #111111"
      >
        <TableContainer
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          flex="1"
          overflowY="auto"
          fontSize="16px"
        >
          <Table variant="simple" overflow="auto" maxH="calc(100vh - 260px)">
            <Thead position="sticky" top="0" color="#fff" bg="black">
              <Tr>
                <Th color={"white"}>Creator</Th>
                <Th color={"white"}>Joined</Th>
                <Th color={"white"}> Commission</Th>
                <Th color={"white"}> Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Flex
                    alignItems="center"
                    gap="8px"
                    as="a"
                    href="/profile"
                    _hover={{
                      color: "#9b5de5",
                    }}
                  >
                    <Avatar
                      size="sm"
                      border="1px solid #111111"
                      src="https://djfan.ams3.cdn.digitaloceanspaces.com/2023/05/ff-bc341bdfde4ec0d1a583944ca302aa39-ff-richy_ahmed_metrodanceclub-358x500-1.jpg"
                    ></Avatar>
                    <Text
                      fontWeight="600"
                      _hover={{
                        color: "#9b5de5",
                        textDecoration: "underline",
                      }}
                    >
                      Richy Ahmed
                    </Text>
                  </Flex>
                </Td>
                <Td>11/10/2023</Td>
                <Td>
                  <b>$350</b> per month
                </Td>

                <Td>
                  <Flex>
                    <ViewConnectedAccount />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex
                    alignItems="center"
                    gap="8px"
                    as="a"
                    href="/profile"
                    _hover={{
                      color: "#9b5de5",
                    }}
                  >
                    <Avatar
                      size="sm"
                      border="1px solid #111111"
                      src="https://djfan.ams3.cdn.digitaloceanspaces.com/2023/05/ff-8e14e364f1a0dab2636d07aecd4b0988-ff-EC21F503-E96D-4B3E-93E2-0BD81EB4FAAC.jpeg"
                    ></Avatar>
                    <Text
                      fontWeight="600"
                      _hover={{
                        color: "#9b5de5",
                        textDecoration: "underline",
                      }}
                    >
                      DJ Exotic
                    </Text>
                  </Flex>
                </Td>
                <Td>21/11/2023</Td>
                <Td>
                  <b>$350</b> per month
                </Td>

                <Td>
                  <Flex>
                    <ViewConnectedAccount />
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Stack>
  );
}
