import { Text, Link } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

interface ButtonProps {
  location?: string;
}

export default function PartnerProgramButton(props: ButtonProps) {
  const { location } = props;

  return (
    <>
      <Text
        as={Link}
        display={"flex"}
        alignItems={"center"}
        fontSize={"13px"}
        color={"white"}
        fontWeight={"600"}
        lineHeight={"1em"}
        gap={"5px"}
        cursor={"pointer"}
        _hover={{
          color: "cyan",
        }}
        onClick={() => {
          if (window["google_tag_manager"]) {
            window.dataLayer.push({
              event: "partner_start",
              element: "partner_program_btn",
              user_type: "partner",
              eventTimeout: 1000,
              eventCallback: function () {
                window.open(
                  "https://dj.djfan.app/partners-registration",
                  "_self"
                );
              },
            });
          } else {
            window.open("https://dj.djfan.app/partners-registration", "_self");
          }
        }}
      >
        PARTNER PROGRAM <FaArrowRight />
      </Text>
    </>
  );
}

{
  /* 
<Text
as={Link}
display={"flex"}
alignItems={"center"}
fontSize={"12px"}
color={"white"}
fontWeight={"600"}
lineHeight={"1em"}
gap={"5px"}
cursor={"pointer"}

onClick={() => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "signup_start",
      element: "partner-program-btn",
      user_type: "partner",
      eventTimeout: 1000,
      eventCallback: function () {
        window.open(
          "https://dj.djfan.app/partners-registration",
          "_self"
        );
      },
    });
  } else {
    window.open(
      "https://dj.djfan.app/partners-registration",
      "_self"
    );
  }
}}
_hover={{
  color: "cyan",
}}
>
PARTNER PROGRAM <FaArrowRight />
</Text>    
*/
}
