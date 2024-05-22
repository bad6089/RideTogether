import React from 'react';
import {
  Flex,
  Button,
  ButtonGroup,
  Image,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import carpoolLogo from '../assets/banner.svg';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { Link } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';

const Header = () => {
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

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Flex
      as='header'
      p='2'
      justifyContent='center'
      alignItems='center'
      height='350px'
    >
      <Flex
        width='100%'
        maxW='900px'
        mx='auto'
        flexDirection={['column', null, 'row']}
        justifyContent='center'
        alignItems='center'
      >
        <Box textAlign={['center', null, 'left']} mb={['4', null, '0']}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Text
              fontSize={['5xl', null, '5xl', '7xl']}
              fontWeight='bold'
              color='#150035'
              mb='-7'
            >
              CARPOOL
            </Text>
            <Text
              fontSize={['4xl', null, '5xl', '7xl']}
              fontWeight='bold'
              color='#150035'
            >
              HUB
            </Text>
          </Link>
          <ButtonGroup
            size='md'
            isAttached
            variant='outline'
            colorScheme='gray'
            mt=''
          >
            {Auth.loggedIn() ? (
              <>
                <Flex align='center'>
                  <Popover placement='bottom-start'>
                    <PopoverTrigger>
                      <Avatar
                        name={Auth.getProfile().data.username}
                        cursor='pointer'
                      />
                    </PopoverTrigger>
                    <PopoverContent width="fit-content">
                      <PopoverHeader fontWeight='semibold'>
                        <Flex align='center'>
                          <Avatar
                            name={Auth.getProfile().data.username}
                            cursor='pointer'
                          />
                          <Link
                            to='/me'
                            style={{
                              textDecoration: 'none',
                              marginLeft: '8px',
                            }}
                          >
                            <Text>
                              {Auth.getProfile().data.username}'s profile
                            </Text>
                          </Link>
                        </Flex>
                      </PopoverHeader>
                      <PopoverArrow />
                      {/* <PopoverCloseButton /> */}
                      <PopoverBody>
                        <Button borderRadius='full' onClick={logout}>
                          Logout
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Text fontSize='2xl' fontWeight='bold' ml={2}>
                    {' '}
                    Hi, {Auth.getProfile().data.username}
                  </Text>
                </Flex>
                <Link to='/me' style={{ textDecoration: 'none' }}></Link>
              </>
            ) : (
              <>
                <Button borderRadius='full' mr='px' onClick={onLoginOpen}>
                  Login
                </Button>
                <Login isOpen={isLoginOpen} onClose={onLoginClose} />
                <Button borderRadius='full' ml='px' onClick={onSignupOpen}>
                  Sign Up
                </Button>
                <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
              </>
            )}
          </ButtonGroup>
        </Box>
        <Image
          src={carpoolLogo}
          alt='Logo'
          mt={['-10', null, '0']}
          boxSize={['220px', null, '470px']}
          pl={['0', null, '10']}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
