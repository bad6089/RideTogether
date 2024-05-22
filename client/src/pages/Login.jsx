import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
  Link,
} from '@chakra-ui/react';
import Auth from '../utils/auth';

const Login = ({ isOpen, onOpen, onClose }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            {data ? (
              <Box>
                Success! You may now head{' '}
                <Link as={RouterLink} to='/'>
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
                <Input
                  rounded='full'
                  placeholder='******'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChange}
                  mb={4}
                />
                <Button colorScheme='teal' type='submit' rounded='full'>
                  Submit
                </Button>
              </form>
            )}
            {error && (
              <Alert status='error' mt={4}>
                <AlertIcon />
                {error.message}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose} rounded='full'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
