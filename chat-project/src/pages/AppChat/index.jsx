import React, { useEffect, useState } from 'react';
import { HStack, Flex, useDisclosure } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Chat from '../Chat';

function AppChat() {
  const { isOpen, onToggle } = useDisclosure();
  const supabase = createClient(
    import.meta.env.VITE_REACT_APP_SUPABASE_URL,
    import.meta.env.VITE_REACT_APP_SUPABASE_KEY,
  );
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const getUser = async () => {
    const session = await supabase.auth.refreshSession();
    console.log(session);
    if (session?.data?.user && session?.data?.session) {
      setValue(session?.data?.user);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <HStack w="full" h="100vh" bg="gray.100" padding={0} gap={1}>
      <Flex
        w="full"
        h="full"
        maxW={isOpen ? 250 : 90}
        bg="#f0f4f9"
        padding={2}
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
      >
        <Sidebar onToggle={onToggle} collapse={isOpen} />
      </Flex>
      <Flex
        as="main"
        w="full"
        h="full"
        bg="white"
      >
        <Chat user={value} />
      </Flex>
    </HStack>
  );
}

export default AppChat;
