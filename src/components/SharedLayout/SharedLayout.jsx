import { Link as ReactRouterLink, Outlet } from 'react-router-dom';
import {
  useColorMode,
  Button,
  Link as ChakraLink,
  Link,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import {
  Container,
  Footer,
  Header,
  HeaderNav,
  HeaderSide,
  InnerHeader, 
} from './SharedLayout.styled';

export const SharedLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container>
      <Header>
        <InnerHeader>
        <HeaderSide>
          <HeaderNav >
            <ChakraLink display='flex' alignItems='center' color='teal.500' fontSize='3xl' as={ReactRouterLink} to="/">
              Map
            </ChakraLink>
            <ChakraLink display='flex' alignItems='center' color='teal.500' fontSize='3xl' as={ReactRouterLink} to="/about">
              About
            </ChakraLink>
          </HeaderNav>
        </HeaderSide>
        <HeaderSide>
          <Button marginTop='3' marginRight='10' colorScheme="teal" onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaSun /> : <FaMoon />}
          </Button>
          <HeaderNav >
            <ChakraLink
              as={ReactRouterLink}
              to="/registration"                          
            display='flex' alignItems='center' color='teal.500' fontSize='2xl'>
              Register
            </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/login"
              display='flex' alignItems='center' color='teal.500' fontSize='2xl'>
              Log In
            </ChakraLink>
          </HeaderNav>
          </HeaderSide>
          </InnerHeader>
      </Header>
      <Outlet />
      <Footer>
        <p>
          E-mail: <Link href="mailto:golyaka.d@gmail.com">golyaka.d@gmail.com</Link>
        </p>
        <p>
          Mobile: <Link href="tel:+380974239084">+38 (097) 423-90-84</Link>
        </p>
      </Footer>
    </Container>
  );
};
