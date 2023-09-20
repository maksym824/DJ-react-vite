import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Fan } from "~/types";

type FanTableProps = {
  children?: React.ReactNode;
};

const FanRow = ({ fan }: { fan: Fan }) => {
  return (
    <Tr>
      <Td>{fan.name}</Td>
      <Td>{fan.username}</Td>
      <Td>{fan.date}</Td>
    </Tr>
  );
};

const FanTable = ({ children }: FanTableProps) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Joined</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
};

FanTable.Row = FanRow;

export default FanTable;
