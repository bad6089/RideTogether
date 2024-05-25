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
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMapMarker } from '@fortawesome/free-solid-svg-icons';

import { ADD_RIDE } from '../utils/mutations';
import { QUERY_RIDES, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AutocompleteInput from '../components/AutocompleteInput';

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

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Box
      bg='white'
      p={6}
      mt={4}
      rounded='md'
      width='100%'
      borderWidth=''
      borderRadius='2rem'
      borderColor='gray.300'
      mx='auto'
      boxShadow='xs'
    >
      <style>{`
        /* Hide default date and time icons */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          display: none;
        }
      `}</style>
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
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FontAwesomeIcon icon={faGlobe} color='#CBD5E0' />
            </InputLeftElement>
            <AutocompleteInput
              placeholder='Origin'
              value={origin}
              onChange={(value) => setOrigin(value)}
              rounded='full'
              width='100%'
            />
          </InputGroup>
        </FormControl>
        <FormControl mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FontAwesomeIcon icon={faMapMarker} color='#CBD5E0' />
            </InputLeftElement>
            <AutocompleteInput
              placeholder='Destination'
              value={destination}
              onChange={(value) => setDestination(value)}
              rounded='full'
              width='100%'
            />
          </InputGroup>
        </FormControl>
        <FormControl mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <CalendarIcon color='gray.300' />
            </InputLeftElement>
            <Input
              type='date'
              name='date'
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              bg=''
              rounded='full'
              mb={2}
              width='100%'
              onClick={(e) => e.target.showPicker()}
            />
          </InputGroup>
        </FormControl>
        <FormControl mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <TimeIcon color='gray.300' />
            </InputLeftElement>
            <Input
              type='time'
              name='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              bg=''
              rounded='full'
              mb={2}
              width='100%'
              onClick={(e) => e.target.showPicker()}
            />
          </InputGroup>
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
