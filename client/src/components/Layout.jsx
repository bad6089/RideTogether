// src/components/Layout.jsx
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box maxW='900px' mx='auto' p={4}>
      {children}
    </Box>
  );
};

export default Layout;
