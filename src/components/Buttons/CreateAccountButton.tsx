import { Button } from "@chakra-ui/react";

export default function CreateAccountButton() {
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
          if ((window as any)["google_tag_manager"]) {
            window.dataLayer.push({
              event: "signup_start",
              element: "create_account_btn",
              user_type: "dj",
              eventTimeout: 1000,
              eventCallback: function (id: string) {
                if (id == "GTM-MXLNMK2") {
                  window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
                }
              },
            });
          } else {
            window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
          }
        }}
      >
        CREATE ACCOUNT
      </Button>
    </>
  );
}
