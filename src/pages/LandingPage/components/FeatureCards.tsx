import { Card, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

type FeatureCardData = {
  src: string;
  title: string;
  description: string;
};

const featureCardsData: FeatureCardData[] = [
  {
    src: "https://files.djfan.app/images/first-release.webp",
    title: "Monetise Your Audience",
    description:
      "Offer monthly memberships with exclusive content, updates, guest-list chances, playlists + more.",
  },
  {
    src: "https://files.djfan.app/images/engage-your-fanbase.webp",
    title: "Engage Your Fanbase",
    description:
      "Nurture, reward, and grow your audience. Communicate directly and get to know your most dedicated fans.",
  },
  {
    src: "https://files.djfan.app/images/backstage.webp",
    title: "Create Consistency",
    description:
      "Establish a recurring revenue stream and say goodbye to inconsistent, seasonal income and stress.",
  },
  {
    src: "https://files.djfan.app/images/done-for-you.webp",
    title: "Done-For-You Setup",
    description:
      "Sit-back while we launch your fully-featured membership solution + provide ongoing support.",
  },
  {
    src: "https://files.djfan.app/images/one-stop-destination.webp",
    title: "Your Fans, Your Data",
    description:
      "Maintain 100% ownership and control over customer info, audience analytics, and payment gateways.",
  },
  {
    src: "https://files.djfan.app/images/direct-communication.webp",
    title: "Flexible Payouts",
    description:
      "Unlike slow-paying venues you can pay yourself whenever you want, or receive scheduled auto payments.",
  },
];

export default function FeatureCards() {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      py={{ base: "30px", md: "50px" }}
    >
      <Flex
        flexWrap="wrap"
        gap="20px"
        flexDir="row"
        maxW="1100px"
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Flex
          bg="linear-gradient(75deg,#8553F4, #811E86)"
          direction="column"
          justifyContent="center"
          w={{ base: "90%", md: "100%" }}
          maxW="1100px"
          align="center"
          py="30px"
          px={{ base: "20px", md: "30px" }}
          borderRadius="10px"
          color="white"
          gap={{ base: "0px", md: "10px" }}
        >
          <Heading fontSize={{ base: "28px", md: "36px" }}>
            Why join DJfan?
          </Heading>
          <Text
            textAlign="center"
            pt="6px"
            fontSize={{ base: "18px", md: "22px" }}
          >
            Earn monthly passive income by offering paid memberships directly to
            eager fans. Increase fan engagement while gaining the freedom and
            financial stability to focus on doing your best work.
          </Text>
        </Flex>
        {featureCardsData.map((card) => (
          <Card
            key={card.title}
            borderRadius="10px"
            w={{ base: "90%", md: "32%" }}
            overflow="hidden"
            textAlign="center"
            border="2px solid #111"
          >
            <Image maxH="200px" objectFit="cover" src={card.src} />
            <VStack gap="5px" px="15px" py={{ base: "15px", md: "20px" }}>
              <Heading fontSize="20px" fontWeight="700">
                {card.title}
              </Heading>
              <Text w="100%" fontSize="16px" fontWeight="500">
                {card.description}
              </Text>
            </VStack>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}
