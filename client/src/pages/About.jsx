// src/pages/About.jsx
import { Box, Heading, Text, Container } from '@chakra-ui/react';

const About = () => {
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
          About Us
        </Heading>
        <Text fontSize='lg' mb={4}>
          Welcome to CarPoolHub! Our mission is to make ride-sharing easy and
          convenient for everyone. Whether you're a driver looking for
          passengers to share your journey with, or a passenger looking for a
          ride, CarPoolHub connects you with others going the same way.
        </Text>
        <Text fontSize='lg' mb={4}>
          Our platform allows users to create and join carpooling rides
          effortlessly. With our user-friendly interface, you can quickly find
          rides that match your schedule and destination. We prioritize safety
          and reliability, ensuring that all users have a pleasant experience.
        </Text>
        <Text fontSize='lg' mb={4}>
          Join our community today and start sharing your rides! Together, we
          can reduce traffic, save money, and help the environment.
        </Text>
      </Box>
    </Container>
  );
};

export default About;
