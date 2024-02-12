import { Link as ReactRouterLink, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  useColorMode,
  useColorModeValue,
  Button,
  Link as ChakraLink,
  Link,
  Hide,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import {
  Container,
  OutletContainer,
  Footer,
  Header,
  HeaderNav,
  HeaderSide,
  InnerHeader,
  FooterText,
} from './SharedLayout.styled';
import { linkFontSize, noteFontSize } from './SharedLayout.my-chakra-ui';
import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { NotifyAlert } from 'components/Notify/Notify';
import { IfAuth } from './IfAuth/IfAuth';
import { IfNoAuth } from './IfNoAuth/IfNoAuth';
import { notifyToast } from 'components/Notify/notifyPropertyCode';

export let access;

window.addEventListener('offline', e => {
  notifyToast('error', 'The browser is in offline mode!');
});

window.addEventListener('online', e => {
  notifyToast('info', 'The browser is in online mode!');
});

export const SharedLayout = () => {
  const [userEmail, setUserEmail] = useState(() =>
    initialState('Kamyanske-map-email')
  );
  const [token, setToken] = useState(() => initialState('Kamyanske-map-token'));
  const [complite, setComplite] = useState(false);

  function initialState(source) {
    const store = JSON.parse(localStorage.getItem(source));
    if (store === null) {
      return '';
    }
    return store;
  }

  const { colorMode, toggleColorMode } = useColorMode();

  const option = {
    textColor: useColorModeValue('gray.800', 'white'),
  };

  // This will run one time after the component mounts
  useEffect(() => {
    const onPageLoaded = () => {
      setComplite(true);
      // do something else
    };

    const onPageLoading = () => {
      setComplite(false);
    };

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
    access = token;
  }, [userEmail, token]);

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
            <Hide breakpoint="(max-width: 540px)">
              <Button
                marginRight="10"
                colorScheme="teal"
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? <FaSun /> : <FaMoon />}
              </Button>
            </Hide>
            {token.length > 0 ? (
              <IfAuth
                email={userEmail}
                setEmail={setUserEmail}
                setToken={setToken}
              />
            ) : (
              <IfNoAuth />
            )}
          </HeaderSide>
        </InnerHeader>
      </Header>
      <OutletContainer>
        {complite ? <Outlet context={[setUserEmail, setToken]} /> : <Loader />}
        <NotifyAlert />
      </OutletContainer>
      <Hide breakpoint="(max-width: 420px)">
        <Footer>
          <FooterText fontSize={noteFontSize} color={option.textColor}>
            The website was created by Dmytrii Holiaka
          </FooterText>
          <Hide breakpoint="(max-width: 700px)">
            <FooterText fontSize={noteFontSize} color={option.textColor}>
              &nbsp; <MdOutlineEmail />
              :&nbsp;
              <Link href="mailto:golyaka.d@gmail.com">golyaka.d@gmail.com</Link>
            </FooterText>
            <FooterText fontSize={noteFontSize} color={option.textColor}>
              <BsTelephone />
              :&nbsp;
              <Link href="tel:+380974239084">+38 (097) 423-90-84</Link>
            </FooterText>
          </Hide>
        </Footer>
      </Hide>
    </Container>
  );
};
