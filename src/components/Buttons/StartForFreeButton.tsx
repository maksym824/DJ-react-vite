import { Button } from "@chakra-ui/react";

interface ButtonProps {
  location?: string;
}

export default function StartForFreeButton(props: ButtonProps) {
  const { location } = props;

  return (
    <>
      <Button
        borderRadius="5px"
        mt="10px"
        bg="#fff"
        size="lg"
        fontWeight="700"
        color="#300a6e"
        onClick={() => {
          if (window["google_tag_manager"]) {
            window.dataLayer.push({
              event: "signup_start",
              element: "start_for_free_btn",
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
        START FOR FREE
      </Button>
    </>
  );
}
