import '@assets/main.css';
import { ThemeProvider } from 'next-themes'
import { HelmetProvider } from 'react-helmet-async';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '@nezhos/i18n';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const locales = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "foo.bar": "BARRR"
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: true,

    interpolation: {
      escapeValue: false,
    }
  });

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
