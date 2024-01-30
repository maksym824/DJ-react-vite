import { Box, HStack, Stack } from "@chakra-ui/react";
import FileTag from "./FileTag";

type Props = {
  allowedFileTypes?: string[];
};

// Define the file types and their descriptions
const FILE_TYPES = [
  { type: "mp3", description: "MP3 audio format" },
  { type: "flac", description: "Free Lossless Audio Codec" },
  { type: "aiff", description: "Audio Interchange File Format" },
  { type: "aifc", description: "Compressed Audio Interchange File" },
  { type: "wav", description: "Waveform Audio File Format" },
  { type: "zip", description: "Zip file" },
  { type: "mp4", description: "MP4 video format" },
  { type: "mov", description: "Quicktime video format" },
  { type: "avi", description: "Audio Video Interleave" },
];

const FileChoices = ({ allowedFileTypes = [] }: Props) => {
  const fileTypes = FILE_TYPES.filter((file) => {
    if (allowedFileTypes.length === 0) return true;
    return allowedFileTypes.includes(file.type);
  });

  return (
    <Stack>
      <HStack>
        <Box fontSize="14px" lineHeight="1em" flexShrink={0}>
          <b>Allowed file types</b>:
        </Box>
        {fileTypes.map((file) => (
          <FileTag
            key={file.type}
            fileType={file.type}
            tooltipDescription={file.description}
          />
        ))}
      </HStack>
      <Box fontSize="14px" lineHeight="1em">
        <b>Maximum file size</b>: 1Gb
      </Box>
    </Stack>
  );
};

export default FileChoices;
