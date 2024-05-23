import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
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
  CloseButton,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Auth from '../utils/auth';

const Login = ({ isOpen, onOpen, onClose }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
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
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
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
          <ModalHeader color='#150035'>Welcome Back</ModalHeader>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={onClose}
          />
          <ModalBody>
            {data ? (
              <Box mb='15'>
                Success! You may now head{' '}
                <Link 
                 to='/'>
                  back to the homepage.
                </Link>
              </Box>
            ) : (
              <form onSubmit={handleFormSubmit}>
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
                      _focus={{ boxShadow: 'none' }}
                      _hover={{ backgroundColor: 'transparent' }}
                      _active={{ backgroundColor: 'transparent' }}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Flex justify='center' mb='15px'>
                  <Button
                    colorScheme='blue'
                    type='submit'
                    rounded='full'
                    width='100%'
                    variant='solid'
                  >
                    Login
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

export default Login;
