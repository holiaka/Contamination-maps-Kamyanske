// Import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
// import { components } from './globalStyle';

// Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '100px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
  
};


// Extend the theme
const theme = extendTheme({ config });

export default theme;
