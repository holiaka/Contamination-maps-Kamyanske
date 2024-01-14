import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { HeaderNav } from '../SharedLayout.styled';
import { authFontSize } from '../SharedLayout.my-chakra-ui';

export const IfNoAuth = () => {
  return (
    <HeaderNav>
      <ChakraLink
        as={ReactRouterLink}
        to="/registration"
        display="flex"
        alignItems="center"
        color="teal.500"
        fontSize={authFontSize}
      >
        Register
      </ChakraLink>
      <ChakraLink
        as={ReactRouterLink}
        to="/login"
        display="flex"
        alignItems="center"
        color="teal.500"
        fontSize={authFontSize}
      >
        Log In
      </ChakraLink>
    </HeaderNav>
  );
};
