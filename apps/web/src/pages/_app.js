import '@assets/main.css';
import { ThemeProvider } from 'next-themes'
import { HelmetProvider } from 'react-helmet-async';
import '@hugios/i18n';

function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class">
        <div className="w-full min-h-screen bg-white dark:bg-black">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default MyApp;
