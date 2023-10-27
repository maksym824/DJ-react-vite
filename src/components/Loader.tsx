import { Box, CircularProgress } from "@chakra-ui/react";

const Loader = () => (
  <Box height="5rem" display="flex" justifyContent="center" p={2}>
    <CircularProgress isIndeterminate />
  </Box>
);

export default Loader;
