import { Link as ReactRouterLink, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
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
import { linkFontSize } from './SharedLayout.my-chakra-ui';
import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { NotifyAlert } from 'components/Notify/Notify';
import { IfAuth } from './IfAuth/IfAuth';
import { IfNoAuth } from './IfNoAuth/IfNoAuth';
import { notifyToast } from 'components/Notify/notifyPropertyCode';

export const SharedLayout = () => {
  const [userEmail, setUserEmail] = useState(() =>
    initialState('Kamyanske-map-email')
  );
  const [token, setToken] = useState(() => initialState('Kamyanske-map-token'));
  const [complite, setComplite] = useState(false);
  const [error, setError] = useState(null);

  function initialState(source) {
    const store = JSON.parse(localStorage.getItem(source));
    if (store === null) {
      return '';
    }
    return store;
  }

  const { colorMode, toggleColorMode } = useColorMode();

  // This will run one time after the component mounts
  // callback function to call when event triggers
  const onPageLoaded = () => {
    setComplite(true);
    // do something else
  };

  const onPageLoading = () => {
    setComplite(false);
  };

  useEffect(() => {
    const pageLoading = condition => {
      if (condition === true) {
        onPageLoading();
      } else {
        onPageLoaded();
      }
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      pageLoading(false);
    } else {
      window.addEventListener('load', pageLoading, false);
      pageLoading(true);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', pageLoading);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Kamyanske-map-email', JSON.stringify(userEmail));
    localStorage.setItem('Kamyanske-map-token', JSON.stringify(token));
  }, [userEmail, token]);

  useEffect(() => {
    notifyToast('error', `Authorisation error: ${error}`);
  }, [error]);

  return (
    <Container>
      <Header>
        <InnerHeader>
          <HeaderSide>
            <HeaderNav>
              <ChakraLink
                display="flex"
                alignItems="center"
                color="teal.500"
                fontSize={linkFontSize}
                as={ReactRouterLink}
                to="/"
              >
                Map
              </ChakraLink>
              <ChakraLink
                display="flex"
                alignItems="center"
                color="teal.500"
                fontSize={linkFontSize}
                as={ReactRouterLink}
                to="/about"
              >
                About
              </ChakraLink>
            </HeaderNav>
          </HeaderSide>
          <HeaderSide>
            <Button
              marginTop="5"
              marginRight="10"
              colorScheme="teal"
              onClick={toggleColorMode}
            >
              {colorMode === 'light' ? <FaSun /> : <FaMoon />}
            </Button>
            {token.length > 0 ? (
              <IfAuth
                email={userEmail}
                setEmail={setUserEmail}
                setToken={setToken}
                setError={setError}
              />
            ) : (
              <IfNoAuth />
            )}
          </HeaderSide>
        </InnerHeader>
      </Header>
      <OutletContainer>
        {complite ? (
          <Outlet context={[setUserEmail, setToken, setError]} />
        ) : (
          <Loader />
        )}
        <NotifyAlert />
      </OutletContainer>
      <Footer>
        <p>
          E-mail:
          <Link href="mailto:golyaka.d@gmail.com">golyaka.d@gmail.com</Link>
        </p>
        <p>
          Mobile: <Link href="tel:+380974239084">+38 (097) 423-90-84</Link>
        </p>
      </Footer>
    </Container>
  );
};
