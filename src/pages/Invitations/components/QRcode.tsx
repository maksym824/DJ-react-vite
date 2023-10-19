import {
  Box,
  Flex,
  Button,
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBarcode } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export default function QRcode() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const qrCodeDataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEiAQMAAABncE31AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAZdJREFUaIHtmcsNhDAMRC1RACXRekqigJWyxONxAGlv8Z4mh4g4Dy4jf7Ee62O9mWGz4zqa7bxrJqqEcrPtYfZD7+fWw4Y3RdVQQ4g2LIfLcQHXFm9SOlG11HVwXfzYu6h/UhCHMUrUH6iHxV3Ejt/xS9RCKtYQYn9tvBNVQ80FhVyXodDjTlQFFfVn5oKju3cYpTunD4laTkESsxmKvAt4+pCoAupmmWavRJEawjVEVVBocmmGOyA3p01UEeVCuEwhzhbVEDzGIJOoAspv/BDAODe/f9dMohZT0AAKpST3iRsbMlHLqZgyWHrCHtUQSqIxjRBVReV0jeKw+31GJlEFVGNQoidsMfy0nAQ1USWUaxCVqPOd8SibYVFlFCrRqIGYljmDwDdElVDT7MpEQkilOHkQVUDNdatEMx7NTdR6ikpkQmBJhHEzK1FRFRREmlGII0+Kw2pIVAGVari5p3fEEzxHVCmFBuDVhgERVU0Zx83wk565WVQV5SpAIf5UnDXQkX2aqPVUrPjNMpuCyA/nlpNmUWupL7rJUdWp6+TVAAAAAElFTkSuQmCC";
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
              <Img height="150px" objectFit="contain" src={qrCodeDataUrl} />
              <Box
                as="a"
                href={qrCodeDataUrl}
                download="QRCode.png"
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
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
