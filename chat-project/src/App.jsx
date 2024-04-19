/* eslint-disable import/no-extraneous-dependencies */
import {
  extendTheme,
  ChakraProvider } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppChat from './pages/AppChat';
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  const theme = extendTheme({
    fonts: {
      heading: '\'Open Sans\', sans-serif',
      body: '\'Open Sans\', sans-serif',
    },
  });

  const router = createBrowserRouter([{
    path: 'app',
    element: <AppChat />,
    errorElement: <ErrorPage />,
  }, {
    path: '',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  }, {
    path: 'sign-up',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  }]);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
