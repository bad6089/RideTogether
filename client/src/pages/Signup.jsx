import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Alert,
  AlertIcon,
  Box,
  Link,
  CloseButton,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = ({ isOpen, onOpen, onClose }) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      username: '',
      email: '',
      password: '',
    });
  };

  const handlePasswordToggle = () => setShowPassword(!showPassword);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='#150035'>Create Account</ModalHeader>
          <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
          <ModalBody>
            {data ? (
              <Box mb='15'>
                Success! You may now head{' '}
                <Link as={RouterLink} to='/'>
                  back to the homepage.
                </Link>
              </Box>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Input
                  rounded='full'
                  placeholder='Your username'
                  name='username'
                  type='text'
                  value={formState.username}
                  onChange={handleChange}
                  mb={4}
                />
                <Input
                  rounded='full'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChange}
                  mb={4}
                />
                <InputGroup size='md' mb={4}>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    name='password'
                    value={formState.password}
                    onChange={handleChange}
                    rounded='full'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={handlePasswordToggle}
                      variant='ghost'
                      _focus={{ boxShadow: 'none' }} // Remove the focus outline
                      _hover={{ backgroundColor: 'transparent' }} // Optional: remove background on hover
                      _active={{ backgroundColor: 'transparent' }} // Optional: remove background on active
                    >
                      {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Flex justify="center" mb='15px'>
                  <Button
                    colorScheme='blue'
                    type='submit'
                    rounded='full'
                    width="100%"
                    variant='solid'
                  >
                    Sign Up
                  </Button>
                </Flex>
              </form>
            )}
            {error && (
              <Alert status='error' mt={4}>
                <AlertIcon />
                {error.message}
              </Alert>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Signup;
