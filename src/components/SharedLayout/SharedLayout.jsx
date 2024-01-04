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
  OutletContainer,
  Footer,
  Header,
  HeaderNav,
  HeaderSide,
  InnerHeader, 
} from './SharedLayout.styled';
import { linkFontSize, authFontSize } from './SharedLayout.my-chakra-ui';
import { useState } from 'react';

export const SharedLayout = () => {  
  const [email, setEmail] = useState(null);
  const [tokеn, setToken] = useState(null);
  const [complite, setComplite] = useState();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container>
      <Header>
        <InnerHeader>
        <HeaderSide>
          <HeaderNav >
            <ChakraLink display='flex' alignItems='center' color='teal.500' fontSize={linkFontSize} as={ReactRouterLink} to="/">
              Map
            </ChakraLink>
            <ChakraLink display='flex' alignItems='center' color='teal.500' fontSize={linkFontSize} as={ReactRouterLink} to="/about">
              About
            </ChakraLink>
          </HeaderNav>
        </HeaderSide>
        <HeaderSide>
            <Button marginTop='5' marginRight='10' colorScheme="teal" onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaSun /> : <FaMoon />}
          </Button>
          <HeaderNav >
            <ChakraLink
                as={ReactRouterLink}
                to="/registration"
                display='flex' alignItems='center' color='teal.500' fontSize={authFontSize}>
              Register
            </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/login"
              display='flex' alignItems='center' color='teal.500' fontSize={authFontSize}>
              Log In
            </ChakraLink>
          </HeaderNav>
          </HeaderSide>
          </InnerHeader>
      </Header>
      <OutletContainer>
        <Outlet />
      </OutletContainer>      
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
