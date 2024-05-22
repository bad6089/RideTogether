import React, { useRef, useState } from 'react';
import {
  Flex,
  Button,
  ButtonGroup,
  Image,
  Box,
  Text,
  useDisclosure,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  useOutsideClick,
} from '@chakra-ui/react';
import carpoolLogo from '../assets/banner.svg';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { Link } from 'react-router-dom';

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

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef();

  useOutsideClick({
    ref: popoverRef,
    handler: () => setIsPopoverOpen(false),
  });

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
                  <Popover
                    isOpen={isPopoverOpen}
                    onClose={() => setIsPopoverOpen(false)}
                    initialFocusRef={popoverRef}
                    placement='bottom-start'
                  >
                    <PopoverTrigger>
                      <Avatar
                        name={Auth.getProfile().data.username}
                        cursor='pointer'
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      />
                    </PopoverTrigger>
                    <PopoverContent ref={popoverRef} width="fit-content">
                      <PopoverArrow />
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
