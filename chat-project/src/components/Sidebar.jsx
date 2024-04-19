/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import { Navigation } from './Navigation';
import AvatarBox from './AvatarBox';

function Sidebar({ collapse, onToggle }) {
  return (
    <>
      <Box w="full">
        <Header onToggle={onToggle} collapse={collapse} />
      </Box>
      <Box w="full">
        <Navigation collapse={collapse} />
        <AvatarBox collapse={collapse} />
      </Box>
    </>
  );
}

export default Sidebar;
