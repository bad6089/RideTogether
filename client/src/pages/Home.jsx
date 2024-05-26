// Home.js
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, Spinner } from '@chakra-ui/react';

import RideList from '../components/RideList';
import RideForm from '../components/RideForm';
import Layout from '../components/Layout';
import CustomButton from '../components/CustomButton'; // Import CustomButton

import { QUERY_RIDES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RIDES);
  const rides = data?.rides || [];
  const [filter, setFilter] = useState('all');

  const filteredRides = rides.filter((ride) => {
    if (filter === 'all') return true;
    if (filter === 'driver') return ride.isDriver;
    if (filter === 'passenger') return !ride.isDriver;
  });

  const handleFilter = (value) => {
    setFilter(value);
  };

  return (
    <Layout>
      <Flex
        justify='center'
        align='center'
        direction='column'
        width='100%'
        mt={5}
      >
        <Box width='100%' mb={4}>
          <RideForm />
        </Box>
        <Box width='100%' pb={4} mt={8} mb={1}>
          <CustomButton
            onClick={() => handleFilter('all')}
            bg={filter === 'all' ? '#150035' : '#847995'}
          >
            All
          </CustomButton>
          <CustomButton
            onClick={() => handleFilter('driver')}
            bg={filter === 'driver' ? '#150035' : '#847995'}
            ml={2}
          >
            Driver
          </CustomButton>
          <CustomButton
            onClick={() => handleFilter('passenger')}
            bg={filter === 'passenger' ? '#150035' : '#847995'}
            ml={2}
          >
            Passenger
          </CustomButton>
        </Box>
        <Box width='100%' maxW='900px'>
          {loading ? (
            <Spinner size='xl' />
          ) : (
            <RideList rides={filteredRides} title='Available Rides...' />
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Home;
