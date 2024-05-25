import { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navigation = ({
  selectedTab,
  setSelectedTab,
  isMobile,
  setIsMenuOpen,
}) => {
  const handleClick = (tabIndex) => {
    setSelectedTab(tabIndex);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const buttonStyle = (tabIndex) => ({
    variant: 'ghost',
    color: selectedTab === tabIndex ? '#150035' : 'gray.500',
    fontWeight: 'bold',
    fontSize: 'xl',
    _focus: { boxShadow: 'none' },
    _hover: { textDecoration: 'none', color: '#150035' },
    _active: { bg: 'transparent' },
    mx: isMobile ? 0 : 2,
    mb: isMobile ? 2 : 0,
    onClick: () => handleClick(tabIndex),
  });

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justifyContent='center'
      flex='1'
    >
      <Button as={Link} to='/' {...buttonStyle(0)}>
        Home
        {selectedTab === 0 && !isMobile && (
          <Box
            position='absolute'
            bottom='-10px'
            left='50%'
            transform='translateX(-50%)'
            width='30px'
            height='5px'
            bg='#150035'
            borderRadius='full'
            transition='all 0.3s ease'
          />
        )}
      </Button>
      <Button as={Link} to='/about' {...buttonStyle(1)}>
        About
        {selectedTab === 1 && !isMobile && (
          <Box
            position='absolute'
            bottom='-10px'
            left='50%'
            transform='translateX(-50%)'
            width='30px'
            height='5px'
            bg='#150035'
            borderRadius='full'
            transition='all 0.3s ease'
          />
        )}
      </Button>
      <Button as={Link} to='/support' {...buttonStyle(2)}>
        Support
        {selectedTab === 2 && !isMobile && (
          <Box
            position='absolute'
            bottom='-10px'
            left='50%'
            transform='translateX(-50%)'
            width='30px'
            height='5px'
            bg='#150035'
            borderRadius='full'
            transition='all 0.3s ease'
          />
        )}
      </Button>
    </Flex>
  );
};

export default Navigation;
