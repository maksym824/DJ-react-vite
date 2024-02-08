import { Button } from "@chakra-ui/react";

export default function SignInButton() {
  return (
    <>
      <Button
        bg="white"
        borderRadius="5px"
        fontSize="15px"
        fontWeight="600"
        variant="unstyled"
        color="#111111"
        transition="all 0.3s ease"
        onClick={() => {
          if ((window as any)["google_tag_manager"]) {
            window.dataLayer.push({
              event: "signin_start",
              element: "sign-in-dj-btn",
              user_type: "dj",
              eventTimeout: 1000,
              eventCallback: function () {
                window.open(import.meta.env.VITE_DJFAN_SIGN_IN_URL, "_self");
              },
            });
          } else {
            window.open(import.meta.env.VITE_DJFAN_SIGN_IN_URL, "_self");
          }
        }}
        border="2px solid black"
        px="15px"
        height="35px"
        _hover={{
          boxShadow: `.15rem .15rem 0 #69f2eb, .3rem .3rem 0 #DB62FD`,
          color: "black",
          background: "white",
          border: "2px solid black",
        }}
      >
        DJ SIGN IN
      </Button>
    </>
  );
}
