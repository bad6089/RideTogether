import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  ButtonGroup,
  useDisclosure,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  useOutsideClick,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Logo from '../assets/logo.svg';
import Navigation from './Navigation'; // Import the new Navigation component

const Header = () => {
  const [selectedTab, setSelectedTab] = useState(0);
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <Layout>
      <Flex
        as='nav'
        p='2'
        justifyContent='space-between'
        alignItems='center'
        height='61px'
        position='relative'
      >
        {/* Hamburger menu for mobile */}
        <IconButton
          icon={<FontAwesomeIcon icon={faBarsStaggered} size='x' />} // Use FontAwesomeIcon with size 2x
          display={{ base: 'flex', md: 'none' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          variant='unstyled' // Remove outline
          aria-label='Open Menu'
        />

        {/* Logo and text */}
        <Flex alignItems='center'>
          <img src={Logo} alt='Logo' width='25px' />
          {Auth.loggedIn() && (
            <Text fontSize='3xl' fontWeight='bold' color='#150035' ml='2'>
              Carpool
            </Text>
          )}
        </Flex>

        {/* Center buttons for larger screens */}
        <Box display={{ base: 'none', md: 'flex' }} flex='1'>
          <Navigation
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            isMobile={false}
          />
        </Box>

        {/* Right side with login/signup/profile */}
        <Flex>
          <ButtonGroup size='md'>
            {Auth.loggedIn() ? (
              <Flex align='center'>
                <Popover
                  isOpen={isPopoverOpen}
                  onClose={() => setIsPopoverOpen(false)}
                  initialFocusRef={popoverRef}
                  placement='bottom-start'
                >
                  <PopoverTrigger>
                    <Avatar
                      size='sm'
                      name={Auth.getProfile().data.username}
                      cursor='pointer'
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    />
                  </PopoverTrigger>
                  <PopoverContent ref={popoverRef} width='fit-content'>
                    <PopoverArrow />
                    <PopoverHeader fontWeight='semibold'>
                      <Flex align='center'>
                        <Avatar
                          name={Auth.getProfile().data.username}
                          cursor='pointer'
                        />
                        <Link
                          to='/me'
                          style={{ textDecoration: 'none', marginLeft: '8px' }}
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
                <Box
                  ml={2}
                  p={2}
                  bg='#f5f5f5'
                  borderRadius='full'
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='center'
                >
                  <Text fontSize='lg' fontWeight='bold'>
                    Hi, {Auth.getProfile().data.username}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <>
                <Button
                  variant='outline'
                  borderRadius='full'
                  mr='px'
                  onClick={onLoginOpen}
                  bg='white'
                  color='#150035'
                  _hover={{ bg: '#E8EBF1', color: '#150035' }}
                  _active={{ bg: '#A298AA', color: '#150035' }}
                >
                  Login
                </Button>
                <Login isOpen={isLoginOpen} onClose={onLoginClose} />
                <Button
                  borderRadius='full'
                  ml='px'
                  onClick={onSignupOpen}
                  bg='#150035'
                  color='#FFFFFF'
                  _hover={{ bg: '#150C5F', color: '#FFFFFF' }}
                  _active={{ bg: '#352E72', color: '#FFFFFF' }}
                >
                  Sign Up
                </Button>
                <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
              </>
            )}
          </ButtonGroup>
        </Flex>
      </Flex>

      {/* Mobile menu */}
      <Collapse in={isMenuOpen} animateOpacity>
        <Navigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isMobile={true}
          setIsMenuOpen={setIsMenuOpen}
        />
      </Collapse>
    </Layout>
  );
};

export default Header;
