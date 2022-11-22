import '@assets/main.css';
import { ThemeProvider } from 'next-themes'
import { HelmetProvider } from 'react-helmet-async';
import { ChakraProvider } from '@chakra-ui/react';
import '@nezhos/i18n';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class">
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default MyApp;
