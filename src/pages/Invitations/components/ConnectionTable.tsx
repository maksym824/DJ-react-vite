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
} from "@chakra-ui/react";
import ViewConnectedAccount from "./ViewConnectedAccount";
import { Invitee } from "~/types";
import dayjs from "dayjs";

type ConnectionTableProps = {
  children?: React.ReactNode;
};

const ConnectionTable = ({ children }: ConnectionTableProps) => {
  return (
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
            <Th color={"white"}>Period</Th>
            <Th color={"white"}>Commission</Th>
            <Th color={"white"}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
};

const ConnectionRow = ({ invitee }: { invitee: Invitee }) => {
  return (
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
            src={`https://files.djfan.app/${invitee.profile_picture_cache}`}
          ></Avatar>
          <Text
            fontWeight="600"
            _hover={{
              color: "#9b5de5",
              textDecoration: "underline",
            }}
          >
            {invitee.display_name}
          </Text>
        </Flex>
      </Td>
      <Td>{dayjs(new Date(invitee.created_at)).format("DD/MM/YYYY")}</Td>
      <Td>{dayjs(new Date(invitee.period)).format("MMMM YYYY")}</Td>
      <Td>
        <b>{invitee.amount}</b> per month
      </Td>
      <Td>
        <Flex>
          <ViewConnectedAccount />
        </Flex>
      </Td>
    </Tr>
  );
};

ConnectionTable.Row = ConnectionRow;

export default ConnectionTable;
