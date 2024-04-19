/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdMenu } from 'react-icons/md';

function Header({ onToggle, collapse }) {
  return (
    <Flex w="full" p={1} alignItems="center" justifyContent={!collapse && 'center'}>
      <IconButton
        icon={<MdMenu />}
        isRound
        variant="solid"
        color="gray.500"
        onClick={onToggle}
      />
    </Flex>
  );
}

export default Header;
