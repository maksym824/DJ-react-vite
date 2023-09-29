import { Button } from "@chakra-ui/react";

const SignOutBtn = () => {
  const handleSignOut = () => {
    window.open(import.meta.env.VITE_DJFAN_SIGN_OUT_URL, "_self");
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutBtn;
