import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBarcode } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import QRCode from "react-qr-code";
import { Canvg } from "canvg";
import { useRef } from "react";

type AppProps = {
  link: string;
};

export default function QRcode(props: AppProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef(null);

  const getQRImage = async function () {
    const element: HTMLElement = ref.current!;
    if (element != null) {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      console.log(element?.outerHTML);
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(element);
      const v = Canvg.fromString(context, svgString);
      await v.render();
      const dataUri = canvas.toDataURL("image/png");
      console.log(dataUri);
      /*
      const v = Canvg.fromString(context, element?.outerHTML);
      await v.render();
      const dataUri = canvas.toDataURL("image/png");
      console.log(dataUri);
      */
      // return dataUri;
    }
  };

  return (
    <>
      <Button
        rightIcon={<FaBarcode />}
        bg="#111111"
        borderWidth="0px"
        color="#ffffff"
        mt="10px"
        onClick={onOpen}
        _active={{
          border: "4px solid green",
        }}
        _hover={{
          bg: "#5DE59A",
          color: "#ffffff",
        }}
      >
        Show QR code
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="300px">
          <Box
            as="a"
            onClick={onClose}
            position="absolute"
            top="15px"
            right="15px"
            color="#ffffff"
            border="1px solid #ffffff"
            borderRadius="5px"
            cursor="pointer"
            p="2px"
            _hover={{ border: "1px solid #111111", color: "#ffffff" }}
          >
            <GrClose />
          </Box>
          <ModalBody>
            <Flex
              flexDirection="column"
              py="15px"
              alignItems="center"
              gap="20px"
            >
              <Box
                paddingTop={10}
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 256,
                  width: "100%",
                }}
              >
                <QRCode
                  level="Q"
                  ref={ref}
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={props?.link}
                  viewBox={`0 0 256 256`}
                />
              </Box>

              <Button colorScheme="teal" size="xs" onClick={getQRImage}>
                Button
              </Button>

              {/*
              <Box
                as="a"
                style={{ textDecoration: "none" }}
                height="24px"
                lineHeight="1.2"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                border="1px"
                px="8px"
                borderRadius="2px"
                fontSize="14px"
                fontWeight="semibold"
                bg="#f5f6f7"
                borderColor="#ccd0d5"
                color="#4b4f56"
                _hover={{ bg: "#ebedf0" }}
                _active={{
                  bg: "#dddfe2",
                  transform: "scale(0.98)",
                  borderColor: "#bec3c9",
                }}
                _focus={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                }}
              >
                Save Image
              </Box>
              */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
