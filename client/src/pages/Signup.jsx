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
  ModalFooter,
  Input,
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
  Link,
} from '@chakra-ui/react';

const Signup = ({ isOpen, onOpen, onClose }) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
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

export default Signup;
