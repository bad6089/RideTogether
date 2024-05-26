import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  useToast,
  HStack,
  Flex,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import AutocompleteInput from './AutocompleteInput';

const TestForm = () => {
  const [originA, setOriginA] = useState('');
  const [destinationA, setDestinationA] = useState('');
  const [originB, setOriginB] = useState('');
  const [destinationB, setDestinationB] = useState('');
  const [coords, setCoords] = useState({
    originA: null,
    destinationA: null,
    originB: null,
    destinationB: null,
  });
  const toast = useToast();

  const handleCoordinatesChange = (location, coordinates) => {
    setCoords((prevCoords) => ({
      ...prevCoords,
      [location]: coordinates,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!originA || !destinationA || !originB || !destinationB) {
      toast({
        title: 'Error',
        description: 'Please complete all the fields before submitting.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (
      !coords.originA ||
      !coords.destinationA ||
      !coords.originB ||
      !coords.destinationB
    ) {
      toast({
        title: 'Error',
        description: 'Please select valid locations from the suggestions.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Coordinates fetched successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg='white'
      p={6}
      mt={-1}
      rounded='md'
      width='100%'
      mx='auto'
      boxShadow='xs'
    >
      <form onSubmit={handleFormSubmit}>
        <Text
          fontSize='xl'
          mb={4}
          textAlign='center'
          color='#150035'
          fontWeight='bold'
        >
          Compare Routes
        </Text>

        <Text
          fontSize='lg'
          mb={4}
          textAlign='left'
          color='#150035'
          fontWeight='bold'
        >
          Route 1
        </Text>
        <FormControl mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FontAwesomeIcon icon={faGlobe} color='#CBD5E0' />
            </InputLeftElement>
            <AutocompleteInput
              placeholder='Origin A'
              value={originA}
              onChange={setOriginA}
              onCoordinatesChange={(coords) =>
                handleCoordinatesChange('originA', coords)
              }
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
              placeholder='Destination A'
              value={destinationA}
              onChange={setDestinationA}
              onCoordinatesChange={(coords) =>
                handleCoordinatesChange('destinationA', coords)
              }
              rounded='full'
              width='100%'
            />
          </InputGroup>
        </FormControl>

        <Text
          fontSize='lg'
          mb={4}
          textAlign='left'
          color='#150035'
          fontWeight='bold'
        >
          Route 2
        </Text>
        <FormControl mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FontAwesomeIcon icon={faGlobe} color='#CBD5E0' />
            </InputLeftElement>
            <AutocompleteInput
              placeholder='Origin B'
              value={originB}
              onChange={setOriginB}
              onCoordinatesChange={(coords) =>
                handleCoordinatesChange('originB', coords)
              }
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
              placeholder='Destination B'
              value={destinationB}
              onChange={setDestinationB}
              onCoordinatesChange={(coords) =>
                handleCoordinatesChange('destinationB', coords)
              }
              rounded='full'
              width='100%'
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
            <Button type='submit' rounded='full'>
              Submit
            </Button>
          </HStack>
        </Flex>

        {coords && (
          <Box mt={4}>
            {coords.originA && (
              <Text>
                Origin A Coordinates: {coords.originA.lat}, {coords.originA.lon}
              </Text>
            )}
            {coords.destinationA && (
              <Text>
                Destination A Coordinates: {coords.destinationA.lat},{' '}
                {coords.destinationA.lon}
              </Text>
            )}
            {coords.originB && (
              <Text>
                Origin B Coordinates: {coords.originB.lat}, {coords.originB.lon}
              </Text>
            )}
            {coords.destinationB && (
              <Text>
                Destination B Coordinates: {coords.destinationB.lat},{' '}
                {coords.destinationB.lon}
              </Text>
            )}
          </Box>
        )}
      </form>
    </Box>
  );
};

export default TestForm;
