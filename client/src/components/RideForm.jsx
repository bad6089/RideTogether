import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  useDisclosure,
  Switch,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { ADD_RIDE } from '../utils/mutations';
import { QUERY_RIDES, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const RideForm = () => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isDriver, setIsDriver] = useState(false);

  const [characterCountOrigin, setCharacterCountOrigin] = useState(0);
  const [characterCountDestination, setCharacterCountDestination] = useState(0);

  const [addRide, { error }] = useMutation(ADD_RIDE, {
    refetchQueries: [{ query: QUERY_RIDES }, { query: QUERY_ME }],
  });

  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!origin || !destination || !date || !time) {
      toast({
        title: 'Error',
        description: 'Please complete the form before submitting.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const formattedDate = format(new Date(date), 'MMM, dd yyyy');

      await addRide({
        variables: {
          origin,
          destination,
          date: formattedDate,
          time,
          isDriver,
          rideAuthor: Auth.getProfile().data.username,
        },
      });

      setOrigin('');
      setDestination('');
      setDate('');
      setTime('');
      setIsDriver(false);

      toast({
        title: 'Ride added.',
        description: 'Your ride has been added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error adding ride.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'origin' && value.length <= 280) {
      setOrigin(value);
      setCharacterCountOrigin(value.length);
    } else if (name === 'destination' && value.length <= 280) {
      setDestination(value);
      setCharacterCountDestination(value.length);
    } else if (name === 'date') {
      setDate(value);
    } else if (name === 'time') {
      setTime(value);
    }
  };

  return (
    <Box
      bg='white'
      p={6}
      rounded='md'
      width='100%'
      borderWidth='1px'
      borderRadius='3xl'
      borderColor='gray.300'
      mx='auto'
    >
      <form onSubmit={handleFormSubmit}>
        <Text
          fontSize='xl'
          mb={4}
          textAlign='center'
          color='#150035'
          fontWeight='bold'
        >
          Where are you heading to?
        </Text>
        <FormControl mb={4}>
          <Input
            placeholder='Origin'
            name='origin'
            value={origin}
            onChange={handleChange}
            bg=''
            rounded='full'
            pl={10}
            mb={2}
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            placeholder='Destination'
            name='destination'
            value={destination}
            onChange={handleChange}
            bg=''
            rounded='full'
            pl={10}
            mb={2}
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            type='date'
            name='date'
            value={date}
            onChange={handleChange}
            bg=''
            rounded='full'
            pl={10}
            mb={2}
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            type='time'
            name='time'
            value={time}
            onChange={handleChange}
            bg=''
            rounded='full'
            pl={10}
            mb={2}
          />
        </FormControl>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          mb={4}
          flexWrap='wrap'
        >
          <HStack mb={[2, 0]} justify='space-between' w='100%'>
            <HStack spacing={2}>
              <FormLabel htmlFor='isDriver' mb='0'>
                Are you a driver?
              </FormLabel>
              <Switch
                id='isDriver'
                isChecked={isDriver}
                onChange={() => setIsDriver(!isDriver)}
              />
            </HStack>
            <Button colorScheme='blue' type='submit' rounded='full'>
              Submit
            </Button>
          </HStack>
        </Flex>
        {error && (
          <Text color='red.500' mt={4}>
            {error.message}
          </Text>
        )}
      </form>
      {!Auth.loggedIn() && (
        <Box mt={4} textAlign='center'>
          <Text>
            You need to be logged in to plan your rides. Please{' '}
            <Button variant='link' colorScheme='blue' onClick={onLoginOpen}>
              login
            </Button>{' '}
            or{' '}
            <Button variant='link' colorScheme='blue' onClick={onSignupOpen}>
              signup
            </Button>
            .
          </Text>
          <Login isOpen={isLoginOpen} onClose={onLoginClose} />
          <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
        </Box>
      )}
    </Box>
  );
};

export default RideForm;
