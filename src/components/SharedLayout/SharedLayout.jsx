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
} from './SharedLayout.styled';

export const SharedLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Container>
      <Header>
        <HeaderSide>
          <HeaderNav>
            <ChakraLink as={ReactRouterLink} to="/">
              Home
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/about">
              About
            </ChakraLink>
          </HeaderNav>
        </HeaderSide>
        <HeaderSide>
          <Button colorScheme="teal" onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaSun /> : <FaMoon />}
          </Button>
          <HeaderNav>
            <ChakraLink as={ReactRouterLink} to="/registration" colorScheme='gray'>
              Register
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/login">
              Log In
            </ChakraLink>
          </HeaderNav>
        </HeaderSide>
      </Header>
      <Outlet />
      <Footer>
      
          <p>E-mail: <Link href="mailto:golyaka.d@gmail.com">golyaka.d@gmail.com</Link></p>
          <p>Mobile: <Link href="tel:+380974239084">+38 (097) 423-90-84</Link></p>
      
      </Footer>
    </Container>
  );
};
