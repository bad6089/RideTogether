import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box bg='#F3F2F4'>
      <Box maxW='900px' mx='auto' p={2}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
