import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Header from "../components/Header";

interface AuthLayoutProps {}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  return (
    <Flex flexDirection="column">
      <Header />
    </Flex>
  );
};

export default AuthLayout;
