import React, { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useToast,
  Divider,
  Avatar,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  useOutsideClick,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleDot,
  faMapMarkerAlt,
  faCalendarAlt,
  faCar,
  faPersonWalkingLuggage,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { REMOVE_COMMENT, REMOVE_RIDE } from '../utils/mutations';
import { QUERY_RIDES } from '../utils/queries';
import Auth from '../utils/auth';
import CommentAvatar from '../components/CommentAvatar';
import GoogleMapsIcon from '../assets/google-maps-svgrepo-com.svg';
import { useBreakpointValue } from '@chakra-ui/react';

// Utility function to truncate text to a specified length
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const RideList = ({ rides, title, showTitle = true, showUsername = true }) => {
  // Define character limits for mobile and desktop views
  const characterLimit = useBreakpointValue({ base: 30, md: 85 });

  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_RIDES }],
  });

  const toast = useToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef();

  useOutsideClick({
    ref: popoverRef,
    handler: () => setIsPopoverOpen(false),
  });

  const handleRemoveRide = async (rideId) => {
    try {
      await removeRide({ variables: { rideId } });
      toast({
        title: 'Ride removed.',
        description: 'The ride has been removed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error removing ride.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRemoveComment = async (rideId, commentId) => {
    try {
      await removeComment({ variables: { rideId, commentId } });
      toast({
        title: 'Comment removed.',
        description: 'The comment has been removed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error removing comment.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  if (!rides.length) {
    return (
      <Heading as='h3' size='lg' mb={4}>
        No Rides Yet
      </Heading>
    );
  }

  return (
    <Box>
      {showTitle && (
        <Heading as='h3' size='lg' mb={4}>
          {title}
        </Heading>
      )}
      {rides.map((ride) => {
        // Generate the Google Maps URL
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          ride.origin
        )}&destination=${encodeURIComponent(ride.destination)}`;
        return (
          <Box
            key={ride._id}
            borderColor=''
            borderWidth=''
            borderRadius='2rem'
            overflow='hidden'
            bg='#FFFFFF'
            mb={4}
            boxShadow='xs'
          >
            <Flex
              alignItems='center'
              justifyContent='space-between'
              bg=''
              p={4}>
              <Box flex='1'>
                {showUsername && (
                  <Flex alignItems='center'>
                    <Avatar name={ride.rideAuthor} mr={4} />
                    <Box>
                      <Text fontWeight='bold' fontSize='lg' color='#150035'>
                        {ride.rideAuthor}
                      </Text>
                      <Text fontSize='sm'>
                        {ride.rideAuthor === currentUser ? 'You' : ''} posted
                        this ride {ride.createdAt}
                      </Text>
                    </Box>
                  </Flex>
                )}
              </Box>
              <Flex alignItems='center' ml={2}>
                <Text
                  mr={2}
                  fontSize='md'
                  display={{ base: 'none', md: 'inline' }}
                >
                  {ride.isDriver ? 'Driver' : 'Passenger'}
                </Text>
                <FontAwesomeIcon
                  icon={ride.isDriver ? faCar : faPersonWalkingLuggage}
                  color={ride.isDriver ? '#808080' : '#808080'}
                />
                {ride.rideAuthor === currentUser && (
                  <Popover
                    placement='bottom-start'
                    isOpen={isPopoverOpen}
                    onClose={() => setIsPopoverOpen(false)}
                  >
                    <PopoverTrigger>
                      <IconButton
                        icon={<FontAwesomeIcon icon={faEllipsis} />}
                        variant='ghost'
                        size='md'
                        left='8px'
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      />
                    </PopoverTrigger>
                    <PopoverContent ref={popoverRef} width='fit-content'>
                      <PopoverArrow />
                      <PopoverHeader fontSize='sm'>Manage Ride</PopoverHeader>
                      <PopoverBody>
                        <Button
                          colorScheme='red'
                          size='sm'
                          rounded='full'
                          onClick={() => handleRemoveRide(ride._id)}
                        >
                          Remove Ride
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
              </Flex>
            </Flex>
            <Box p={4} mt='-4'>
              <Divider
                mb='2'
                pl=''
                orientation='horizontal'
                borderColor='gray.300'
              />
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3} left='-0.05rem'>
                  <FontAwesomeIcon icon={faCircleDot} color='#2C7A7B' />
                </Box>
                <Box pl='' mt=''>
                  <Text color='gray.500' fontSize='sm'>
                    Origin
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {truncateText(ride.origin, characterLimit)}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={5} left='1px'>
                  <Box
                    position='absolute'
                    bottom='0.4rem'
                    left='0.19rem'
                    w='7px'
                    h='7px'
                    borderRadius='full'
                    bg='gray.300'
                  ></Box>
                  <Box
                    position='absolute'
                    top='0.3rem'
                    left='0.19rem'
                    w='7px'
                    h='7px'
                    borderRadius='full'
                    bg='gray.300'
                  ></Box>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3} left='1px'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} color='#B22222' />
                </Box>
                <Box pl='1' mt=''>
                  <Text color='gray.500' fontSize='sm'>
                    Destination
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {truncateText(ride.destination, characterLimit)}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='center' mt={2}>
                <Box position='relative' mr={3} left='1px'>
                  <FontAwesomeIcon icon={faClock} color='#808080' />
                </Box>
                <Box pl={-1} pr={3}>
                  <Text color='gray.500' fontSize='sm'>
                    Time
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {ride.time}
                  </Text>
                </Box>
                <Box position='relative' ml={6} mr={3} left='1px'>
                  <FontAwesomeIcon icon={faCalendarAlt} color='#808080' />
                </Box>
                <Box pl={-1}>
                  <Text color='gray.500' fontSize='sm'>
                    Date
                  </Text>
                  <Text fontWeight='bold' fontSize='md'>
                    {ride.date}
                  </Text>
                </Box>
                <Box ml='auto' display='flex' alignItems='center'>
                  <a
                    href={googleMapsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src={GoogleMapsIcon}
                      alt='Google Maps'
                      style={{ height: '36px', marginRight: '0.3rem' }}
                    />
                  </a>
                </Box>
              </Flex>
              <CommentAvatar comments={ride.comments} rideId={ride._id} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default RideList;
