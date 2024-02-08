import { Button } from "@chakra-ui/react";

export default function SignUpButton() {
  return (
    <>
      <Button
        px="10px"
        fontSize="16px"
        height="34px"
        iconSpacing="1"
        bgGradient="linear(to-r, #5c03bc, #e536ab)"
        lineHeight="1em"
        color="#fff"
        border="1px solid #5c03bc"
        _hover={{ bgGradient: "linear(to-r,#e536ab, #5c03bc)" }}
        transition="all 0.3s ease"
        onClick={() => {
          if ((window as any)["google_tag_manager"]) {
            window.dataLayer.push({
              event: "signup_start",
              element: "sign-up-dj-btn",
              user_type: "dj",
              eventTimeout: 1000,
              eventCallback: function () {
                window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
              },
            });
          } else {
            window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
          }
        }}
      >
        DJ SIGN UP
      </Button>
    </>
  );
}
