/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Box, SimpleGrid, Input, InputGroup,
  Button, Flex, Stack, Text, InputRightElement, IconButton } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
// import google from '../../assets/google.png';
// import facebook from '../../assets/facebook.svg';

// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';

function SignUp() {
  const supabase = createClient(
    import.meta.env.VITE_REACT_APP_SUPABASE_URL,
    import.meta.env.VITE_REACT_APP_SUPABASE_KEY,
  );
  // Super base
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [warning, setWarning] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const handleSignUp = async () => {
    try {
      const check = {};
      if (!email) {
        check.email = true;
      }
      if (!password) {
        check.password = true;
      }
      if (!confirmPassword) {
        check.confirmPassword = true;
      }
      setWarning(check);
      if (email && password && confirmPassword) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [show2, setShow2] = React.useState(false);
  const handleClick2 = () => setShow2(!show2);
  return (
    <SimpleGrid columns={2}>
      <Box bg="#e3e3e3" h="100vh" />
      <Stack alignItems="center" justifyContent="center" w="full">
        {/* <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'twitter']}
        /> */}
        <Flex direction="column" w="70%">
          <Flex>
            <Text>Email</Text>
          </Flex>
          <Flex w="full">
            <Input
              isInvalid={warning.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              w="100%"
              placeholder="Email"
              size="lg"
            />
          </Flex>
        </Flex>
        <Flex direction="column" w="70%">
          <Flex>
            <Text>Password</Text>
          </Flex>
          <Flex w="full">
            <InputGroup size="lg">
              <Input
                isInvalid={warning.password}
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        <Flex direction="column" w="70%">
          <Flex>
            <Text>Confirm Password</Text>
          </Flex>
          <Flex w="full">
            <InputGroup size="lg">
              <Input
                isInvalid={warning.confirmPassword}
                pr="4.5rem"
                type={show2 ? 'text' : 'password'}
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  isRound
                  fontSize={20}
                  variant="ghost"
                  onClick={handleClick2}
                  icon={!show2 ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Flex>
        <Flex w="70%" justifyContent="space-between">
          <Link to="/forgot-password">
            Login
          </Link>
        </Flex>
        <Button w="70%" size="lg" onClick={handleSignUp}>
          Sign up
        </Button>
      </Stack>
    </SimpleGrid>
  );
}

export default SignUp;
