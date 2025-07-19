/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import '@assets/main.css';
import { ThemeProvider } from 'components/ThemeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
