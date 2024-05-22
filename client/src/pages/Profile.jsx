import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Heading, Spinner, Button, Flex } from '@chakra-ui/react';

import RideForm from '../components/RideForm';
import RideList from '../components/RideList';
import Layout from '../components/Layout';

import { QUERY_USER, QUERY_ME, QUERY_RIDES } from '../utils/queries';
import { REMOVE_RIDE } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const [currentFilter, setCurrentFilter] = useState('yourRides');

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const { data: rideData, loading: rideLoading } = useQuery(QUERY_RIDES);

  const [removeRide] = useMutation(REMOVE_RIDE, {
    refetchQueries: [
      { query: QUERY_RIDES },
      { query: userParam ? QUERY_USER : QUERY_ME, variables: { username: userParam } }
    ],
  });

  const user = data?.me || data?.user || {};
  const currentUser = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  if (loading || rideLoading) {
    return <Spinner />;
  }

  const handleRemoveRide = async (rideId) => {
    try {
      await removeRide({ variables: { rideId } });
    } catch (err) {
      console.error(err);
    }
  };

  const userRides = rideData?.rides?.filter((ride) => ride.rideAuthor === user.username) || [];
  const commentedRides = rideData?.rides?.filter((ride) =>
    ride.comments.some((comment) => comment.commentAuthor === currentUser)
  ) || [];

  return (
    <Layout>
      <Box textAlign="center" mb={5} border="1px solid #CBD5E0" borderRadius="full">
      <Heading as="h2" size="lg" bg="" color="black" p={3}>
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </Heading>
    </Box>

      <Flex justify="" mt={6} mb={4}>
        <Button
          borderRadius='full'
          onClick={() => setCurrentFilter('yourRides')}
          colorScheme={currentFilter === 'yourRides' ? 'blue' : 'gray'}
        >
          Your Rides
        </Button>
        <Button
          borderRadius='full'
          onClick={() => setCurrentFilter('commentedRides')}
          colorScheme={currentFilter === 'commentedRides' ? 'blue' : 'gray'}
          ml={2}
        >
          Rides You've Commented On
        </Button>
      </Flex>

      <Box mb={5}>
        {currentFilter === 'yourRides' && (
          <RideList
            rides={userRides}
            title="Your rides..."
            showTitle={true}
            showUsername={true}
            handleRemoveRide={handleRemoveRide}
          />
        )}
        {currentFilter === 'commentedRides' && (
          <RideList
            rides={commentedRides}
            title="Rides you've commented on..."
            showTitle={true}
            showUsername={true}
          />
        )}
      </Box>

      {!userParam && (
        <Box mb={3}>
          <RideForm />
        </Box>
      )}
    </Layout>
  );
};

export default Profile;
