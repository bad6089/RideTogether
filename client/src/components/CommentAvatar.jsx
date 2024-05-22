import React from 'react';
import { Avatar, AvatarGroup, Box, Divider, Flex, Button, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChatIcon } from '@chakra-ui/icons';

const CommentAvatar = ({ comments = [], rideId }) => {
    // Create an array of unique authors
    const uniqueAuthors = Array.from(new Set(comments.map(comment => comment.commentAuthor)));

    return (
        <Box>
            <Divider mt="3" mb="3" borderColor="gray.300" />
            <Flex alignItems="center" justifyContent="space-between">
                {uniqueAuthors.length > 0 ? (
                    <AvatarGroup size='sm' max={4}>
                        {uniqueAuthors.map((author, index) => (
                            <Avatar key={index} name={author} />
                        ))}
                    </AvatarGroup>
                ) : (
                    <Text fontSize="sm">No comments yet</Text>
                )}

                {rideId && (
                    <Link as={RouterLink} to={`/rides/${rideId}`}>
                        <Button variant='solid' colorScheme='blue' borderRadius='full'>
                            Go to Post{' '}
                            <ChatIcon ml={2} style={{ marginLeft: '0.5rem' }} />
                            <Text as="span" ml="1" fontSize="sm">
                                {comments.length}
                            </Text>
                        </Button>
                    </Link>
                )}
            </Flex>
        </Box>
    );
};

export default CommentAvatar;
