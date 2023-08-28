import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

interface ErrorPageProps {}

const ErrorPage: FunctionComponent<ErrorPageProps> = () => {
  const error = useRouteError();
  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Heading as="h1" size="md">
        Oops...
      </Heading>
      <Text fontSize="sm">
        {isRouteErrorResponse(error)
          ? "Invalid page."
          : "Sorry, an unexpected error has occurred."}
      </Text>
    </Box>
  );
};

export default ErrorPage;
