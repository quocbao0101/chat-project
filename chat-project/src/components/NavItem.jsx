/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import {
  ListIcon,
  Link as LinkChakra,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export function NavItem({ item, collapse }) {
  const { label } = item;
  if (item.type === 'link') {
    const { icon } = item;
    return (
      <Box
        w="full"
        display="flex"
        alignItems="center"
        my={2}
        justifyContent="center"
      >
        <LinkChakra
          href=""
        //   as={Link}
          gap={3}
        //   bg={isActive && 'teal.400'}
          borderRadius={20}
          p={2.5}
          justifyContent={!collapse && 'center'}
          display="flex"
          alignItems="center"
          color="gray.500"
          w="full"
          _hover={{
            backgroundColor: 'gray.300',
            transition: '300ms',
            borderRadius: 100,
            width: '100%',
          }}
        >
          <ListIcon as={icon} fontSize={24} m="0" />
          {collapse && <Text fontSize={14} fontWeight={600}>{label}</Text>}
        </LinkChakra>
      </Box>
    );
  }
}
