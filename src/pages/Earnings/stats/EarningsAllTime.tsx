import { Card, Flex, Heading, Text } from "@chakra-ui/react";
import { FaUsers, FaCartPlus } from "react-icons/fa";

type EarningProps = {
  membership: number;
  product: number;
  total: number;
};

export default function EarningsAllTime({
  membership,
  product,
  total,
}: EarningProps) {
  return (
    <Flex
      h="100%"
      justifyContent="space-between"
      alignItems="stretch"
      wrap="wrap"
      gap="20px"
    >
      <Card
        w={{ base: "100%", md: "30%" }}
        gap="10px"
        py="15px"
        alignItems="center"
        bg="#ffffff"
      >
        <Text
          fontSize="18px"
          fontWeight="600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="5px"
        >
          <FaUsers /> Membership
        </Text>
        <Heading lineHeight="1em" fontSize="32px">
          ${membership.toFixed(2)}
        </Heading>
        <Text fontSize="14px">
          membership income <b>(All Time)</b>
        </Text>
      </Card>
      <Card
        w={{ base: "100%", md: "30%" }}
        gap="10px"
        py="15px"
        alignItems="center"
        bg="#ffffff"
      >
        <Text
          fontSize="18px"
          fontWeight="600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="5px"
        >
          <FaCartPlus /> Online Store
        </Text>
        <Heading lineHeight="1em" fontSize="32px">
          ${product.toFixed(2)}
        </Heading>
        <Text fontSize="14px">
          product sale income <b>(All Time)</b>
        </Text>
      </Card>
      <Card
        w={{ base: "100%", md: "30%" }}
        gap="10px"
        py="15px"
        alignItems="center"
        bg="#ffffff"
      >
        <Text fontSize="16px" fontWeight="600">
          Total Income
        </Text>
        <Heading lineHeight="1em" fontSize="32px">
          ${total.toFixed(2)}
        </Heading>
        <Text fontSize="14px">
          combined income <b>(All Time)</b>
        </Text>
      </Card>
    </Flex>
  );
}
