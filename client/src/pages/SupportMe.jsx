// src/pages/SupportMe.jsx
import { Box, Heading, Text, Container, Button, Link } from '@chakra-ui/react';

const SupportMe = () => {
  return (
    <Container maxW='900px' mt={8}>
      <Box
        p={6}
        borderWidth='1px'
        borderRadius='lg'
        borderColor='gray.300'
        bg='white'
      >
        <Heading as='h1' size='xl' mb={4} textAlign='center'>
          Support Us
        </Heading>
        <Text fontSize='lg' mb={4}>
          Thank you for considering supporting CarPoolHub! Your support helps us
          continue to provide a reliable and convenient ride-sharing platform
          for everyone. There are several ways you can support us:
        </Text>
        <Heading as='h2' size='lg' mb={4}>
          Donations
        </Heading>
        <Text fontSize='lg' mb={4}>
          If you find our service valuable, consider making a donation. Your
          contributions will help us maintain and improve the platform, ensuring
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
          Share CarPoolHub with your friends and family. The more people use our
          platform, the better it becomes for everyone. Follow us on social
          media and help spread the word!
        </Text>
        <Heading as='h2' size='lg' mb={4}>
          Feedback
        </Heading>
        <Text fontSize='lg' mb={4}>
          We are always looking to improve. If you have any suggestions or
          feedback, please don't hesitate to let us know. Your input is
          invaluable to us.
        </Text>
        <Button colorScheme='blue' size='md' rounded='full'>
          <Link href='mailto:badrulborhanudin@gmail.com' isExternal>
            Send Feedback
          </Link>
        </Button>
      </Box>
    </Container>
  );
};

export default SupportMe;
