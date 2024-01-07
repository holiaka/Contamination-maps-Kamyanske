import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { App } from 'components/App';
import './index.css';
import theme from './thems/thems';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Contamination-maps-Kamyanske">
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
