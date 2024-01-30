import { Box, Tooltip } from "@chakra-ui/react";

// Define the props for the FileTag component
interface FileTagProps {
  fileType: string;
  tooltipDescription: string;
}

// Create a reusable FileTag component
const FileTag = ({ fileType, tooltipDescription }: FileTagProps) => {
  return (
    <Tooltip label={tooltipDescription}>
      <Box
        color="#fff"
        bg="#9b5de5"
        borderRadius="5px"
        px="5px"
        py="3px"
        fontSize="12px"
        lineHeight="1em"
      >
        {fileType}
      </Box>
    </Tooltip>
  );
};

export default FileTag;
