import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Layout>
      <Box
        as='footer'
        w='100%'
        bg='white'
        p={4}
        color='black'
        textAlign='center'
      >
        {location.pathname !== '/' && (
          <Button
            onClick={() => navigate(-1)}
            colorScheme='blue'
            variant='solid'
            mb={3}
            rounded='full'
          >
            &larr; Go Back
          </Button>
        )}
        <Text>
          Made with{' '}
          <span role='img' aria-label='heart' aria-hidden='false'>
            ❤️
          </span>{' '}
          by Badrul Borhanudin.
        </Text>
        <Text mt={2}>
          &copy; {new Date().getFullYear()} CarPoolHub. All rights reserved.
        </Text>
      </Box>
    </Layout>
  );
};

export default Footer;
