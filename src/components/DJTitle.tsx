import {
  EditablePreview,
  Button,
  useColorModeValue,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { updateUserData } from "~/services/settings/userData";

type Props = {
  title?: string;
};

const DJTitle = ({ title }: Props) => {
  const [newTitle, setNewTitle] = useState<string>();
  const toast = useToast();

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <Button {...getSubmitButtonProps()}>
          <CheckIcon />
        </Button>
        <Button p="0" {...getCancelButtonProps()}>
          <CloseIcon boxSize={3} />
        </Button>
      </ButtonGroup>
    ) : null;
  }

  useEffect(() => {
    setNewTitle(title ?? "DJ");
  }, [title]);

  const handleChangeDisplayTitle = async (newDisplayTitle: string) => {
    if (newDisplayTitle === title) {
      return;
    }
    try {
      await updateUserData({ title: newDisplayTitle });
      toast({
        title: "Update Title Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Editable
      value={newTitle}
      onChange={(e) => setNewTitle(e)}
      onSubmit={handleChangeDisplayTitle}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      fontSize="20px"
      color="white"
      mt="10px"
      p="0"
    >
      <Tooltip
        // to hide tooltip on mobile
        display={{
          base: "none",
          md: "block",
        }}
        label="Click to edit"
        bg="#7d5aeb"
        shouldWrapChildren={true}
      >
        <EditablePreview
          py="2px"
          px="10px"
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
            color: "#111",
          }}
        />
      </Tooltip>
      <Input bg="#fff" color="#111" py={2} px={4} as={EditableInput} />
      <EditableControls />
    </Editable>
  );
};

export default DJTitle;
