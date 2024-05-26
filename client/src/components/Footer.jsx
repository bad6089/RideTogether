import { Box, Flex, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout';
import CustomButton from '../components/CustomButton'; // Import CustomButton

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Layout>
      <Box as='footer' w='100%' bg='' p={4} color='black' textAlign='center'>
        {location.pathname !== '/' && (
          <CustomButton
            onClick={() => navigate(-1)}
            variant='solid'
            mb={3}
            rounded='full'
          >
            <FontAwesomeIcon icon={faArrowLeft} /> {/* Use Font Awesome icon */}
            &nbsp;Go Back
          </CustomButton>
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
