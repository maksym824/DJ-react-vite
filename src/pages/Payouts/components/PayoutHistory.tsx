import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { UserPayout } from "~/types";
import dayjs from "dayjs";

type PayoutHistoryProps = {
  payout: UserPayout[];
};

export default function PayoutHistory({ payout }: PayoutHistoryProps) {
  return (
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
              <Th color={"white"}>Amount</Th>
              <Th color={"white"}>Date</Th>
              <Th color={"white"}>Method</Th>
              <Th color={"white"}>Code</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payout.map((payout) => {
              return (
                <Tr key={payout.id}>
                  <Td>${payout.amount}</Td>
                  <Td>
                    {dayjs(new Date(payout.payout_date)).format("DD/MM/YYYY")}
                  </Td>
                  <Td>Paypal</Td>
                  <Td>{payout.payout_code}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
