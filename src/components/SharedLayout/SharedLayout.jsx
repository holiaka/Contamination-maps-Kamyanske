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
import { linkFontSize, authFontSize } from './SharedLayout.my-chakra-ui';
import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { NotifyAlert } from 'components/Notify/Notify';

export const SharedLayout = () => {  
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [complite, setComplite] = useState(false);
  const [error, setError] = useState(null);

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

  const pageLoading = (condition) => {
    if (condition === true) {
      onPageLoading();
    }
    else {
      onPageLoaded();
    }
  };


  useEffect(() => {
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

  // useEffect(() => {
  //   if (token !== null) {
  //     toast.success('You are successfully logged into the system!!!', {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     })
  //   };
  // }, [token])
  
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

        {complite ? <Outlet context={[setUserEmail, setToken, setError]} /> : <Loader />}
        <NotifyAlert />
    
        
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
