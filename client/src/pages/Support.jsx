import { Box, Heading, Text, Button, Link } from '@chakra-ui/react';
import Layout from '../components/Layout';

const SupportMe = () => {
  return (
    <Layout>
      <Box
        mt={4}
        p={6}
        borderWidth='1px'
        borderRadius='3xl'
        borderColor='gray.300'
        bg='white'
      >
        <Heading as='h1' size='xl' mb={4} textAlign='center'>
          Support Me
        </Heading>
        <Text fontSize='lg' mb={4}>
          Thank you for considering supporting CarPoolHub! Your support helps me
          continue to provide a reliable and convenient ride-sharing platform
          for everyone. There are several ways you can support:
        </Text>
        <Heading as='h2' size='lg' mb={4}>
          Donations
        </Heading>
        <Text fontSize='lg' mb={4}>
          If you find my service valuable, consider making a donation. Your
          contributions will help me maintain and improve the platform, ensuring
          a seamless experience for all users.
        </Text>
        <Button colorScheme='blue' size='md' mb={4} rounded='full'>
          <Link href='https://www.stripe.com' isExternal>
            Donate via Stripe
          </Link>
        </Button>
        <Heading as='h2' size='lg' mb={4}>
          Spread the Word
        </Heading>
        <Text fontSize='lg' mb={4}>
          Share CarPoolHub with your friends and family. The more people use the
          platform, the better it becomes for everyone.
        </Text>
        <Heading as='h2' size='lg' mb={4}>
          Feedback
        </Heading>
        <Text fontSize='lg' mb={4}>
          I am always looking to improve. If you have any suggestions or
          feedback, please don't hesitate to let me know. Your input is
          invaluable.
        </Text>
        <Button colorScheme='blue' size='md' rounded='full'>
          <Link href='mailto:badrulborhanudin@gmail.com' isExternal>
            Send Feedback
          </Link>
        </Button>
      </Box>
    </Layout>
  );
};

export default SupportMe;
