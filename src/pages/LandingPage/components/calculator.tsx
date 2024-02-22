import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const EarningsCalculator = () => {
  const [users, setUsers] = useState(500000);

  const earnings = Math.round(0.005 * users * 7.5);

  return (
    <VStack py="30px" bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)">
      <Image
        src="https://files.djfan.app/images/exchange-rate-1.png"
        width={{ base: "55px", md: "75px" }}
      />
      <Heading
        color="#fff"
        py="10px"
        fontSize={{ base: "20px", md: "28px" }}
        lineHeight={{ base: "1em", md: "1em" }}
        textAlign="center"
      >
        Calculate Potential Creator Earnings
      </Heading>
      <VStack
        bg="#111"
        borderRadius="lg"
        boxShadow="xl"
        py="20px"
        w={{ base: "90%", md: "500px" }}
        overflow="hidden"
        border="2px solid cyan"
      >
        <Heading
          color="#fff"
          fontSize={{ base: "18px", md: "20px" }}
          mb="10px"
          lineHeight={{ base: "1.2em", md: "1em" }}
          textAlign="center"
        >
          How many followers do you have?
        </Heading>

        <HStack color="white" justifyContent="flex-start" w="100%" maxW="80%">
          <FaFacebook />
          <FaInstagram />
          <FaTiktok />{" "}
          <Heading size="26px" color="white">
            {users}
          </Heading>
        </HStack>
        <Slider
          maxW="80%"
          aria-label="Number of Users"
          value={users}
          min={100000}
          max={2000000}
          onChange={(val) => setUsers(val)}
          defaultValue={50000}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={4} borderColor="gray.400" borderWidth={1} />
        </Slider>

        <Flex>
          <Box color="white" fontSize="20px">
            Earn an extra{" "}
            <span style={{ color: "cyan", fontWeight: "600" }}>
              ${earnings}
            </span>{" "}
            per month
          </Box>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default EarningsCalculator;
