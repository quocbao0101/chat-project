/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

function AvatarBox({ collapse }) {
  return (
    <Flex
      borderWidth={collapse && 1}
      borderColor="gray.100"
      borderRadius="full"
      w="full"
      gap={1}
      alignItems="center"
      flexDirection={collapse ? 'row' : 'column-reverse'}
    >
      <Box display="flex" alignItems="center">
        <Text fontWeight="bold" fontSize={collapse ? 22 : 18}>
          Chatbots
        </Text>
      </Box>
      {collapse && (
      <Text fontWeight="bold" fontSize={12}>
        v1
      </Text>
      )}
    </Flex>
  );
}

export default AvatarBox;
