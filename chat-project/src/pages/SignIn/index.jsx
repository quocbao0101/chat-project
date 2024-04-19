/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Box, SimpleGrid, Divider, Input, InputGroup,
  Button, Flex, Stack, Text, InputRightElement, IconButton } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.svg';

// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';

function SignIn() {
  const supabase = createClient(
    import.meta.env.VITE_REACT_APP_SUPABASE_URL,
    import.meta.env.VITE_REACT_APP_SUPABASE_KEY,
  );
  const navigate = useNavigate();
  // Super base

  supabase.auth.onAuthStateChange(async (event) => {
    console.log(event);
    if (event === 'SIGNED_IN') {
      navigate('/app');
    }
  });

  const handleGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    console.log(data);
  };

  const handleFacebook = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    console.log(data);
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <SimpleGrid columns={2}>
      <Box bg="#e3e3e3" h="100vh" />
      <Stack alignItems="center" justifyContent="center" w="full">
        {/* <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'twitter']}
        /> */}
        <Flex w="full" direction="column" alignItems="center">
          <Button
            leftIcon={<img src={google} width={40} alt="google" />}
            onClick={handleGoogle}
            size="lg"
            w="70%"
            fontSize={16}
            fontWeight={600}
          >
            Sign in with google
          </Button>
          <Button
            leftIcon={<img src={facebook} width={40} alt="google" />}
            onClick={handleFacebook}
            size="lg"
            w="70%"
            fontSize={16}
            fontWeight={600}
            marginBlock={4}
            colorScheme="facebook"
          >
            Sign in with facebook
          </Button>
        </Flex>
        <Divider width="70%" />
        <Flex direction="column" w="70%">
          <Flex>
            <Text>Username</Text>
          </Flex>
          <Flex w="full">
            <Input w="100%" placeholder="Username" size="lg" />
          </Flex>
        </Flex>
        <Flex direction="column" w="70%">
          <Flex>
            <Text>Password</Text>
          </Flex>
          <Flex w="full">
            <InputGroup size="lg">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  isRound
                  fontSize={20}
                  variant="ghost"
                  onClick={handleClick}
                  icon={!show ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Flex>
        <Flex w="70%" justifyContent="space-between">
          <Link to="/forgot-password">
            Forgot password?
          </Link>
          <Link to="sign-up">
            Dont have an account
          </Link>
        </Flex>
        <Button w="70%" size="lg">
          Sign in
        </Button>
      </Stack>
    </SimpleGrid>
  );
}

export default SignIn;
