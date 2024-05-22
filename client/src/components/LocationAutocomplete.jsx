import React, { useState, useEffect } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  useToast, // Add toast for error display
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useLazyQuery } from '@apollo/client';
import { GET_LOCATION_SUGGESTIONS } from '../utils/queries';
import { useDebounce } from 'use-debounce'; // For debouncing input

const LocationAutocomplete = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast(); // Initialize toast for error notifications

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce input

  const [getLocationSuggestions, { loading, error, data }] = useLazyQuery(
    GET_LOCATION_SUGGESTIONS
  );

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      setIsLoading(true);
      getLocationSuggestions({
        variables: { query: debouncedSearchTerm },
      }).catch((error) => {
        console.error('Error fetching suggestions:', error);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to fetch location suggestions.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        }); // Show error toast
      });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, getLocationSuggestions, toast]); // Add toast to dependency array

  useEffect(() => {
    if (data) {
      setSuggestions(data.getLocationSuggestions);
      setIsLoading(false);
    }
  }, [data]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion);
    setSearchTerm(suggestion.name);
    setSuggestions([]);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input
        type='text'
        placeholder='Enter origin or destination'
        value={searchTerm}
        onChange={handleInputChange}
        isDisabled={isLoading} // Disable input while loading
      />
      {isLoading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((suggestion) => (
            <ListItem
              key={suggestion.placeId}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </ListItem>
          ))}
        </List>
      )}
    </InputGroup>
  );
};

export default LocationAutocomplete;
