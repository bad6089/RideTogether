import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const About = () => {
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
          About Me
        </Heading>
        <Text fontSize='lg' mb={4}>
          Welcome to CarPoolHub! My mission is to make ride-sharing easy and
          convenient for everyone. Whether you're a driver looking for
          passengers to share your journey with, or a passenger looking for a
          ride, CarPoolHub connects you with others going the same way.
        </Text>
        <Text fontSize='lg' mb={4}>
          This platform allows users to create and join carpooling rides
          effortlessly. With a user-friendly interface, you can quickly find
          rides that match your schedule and destination. I prioritize safety
          and reliability, ensuring that all users have a pleasant experience.
        </Text>
        <Text fontSize='lg' mb={4}>
          Join the CarPoolHub community today and start sharing your rides!
          Together, we can reduce traffic, save money, and help the environment.
        </Text>
      </Box>
    </Layout>
  );
};

export default About;
