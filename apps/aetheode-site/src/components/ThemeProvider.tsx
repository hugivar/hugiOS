import React from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');

    if (userMedia.matches) {
      return 'dark';
    }
  }

  return 'light'; // light theme as the default;
};

interface IThemeContext {
  theme: string;
  setTheme: any;
}

interface IThemeProvider {
  children: JSX.Element;
}

export const ThemeContext = React.createContext({} as IThemeContext);

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const initialTheme = getInitialTheme();
  const [theme, setTheme] = React.useState(initialTheme);

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';
    const isSystem = rawTheme === 'system';

    if (isSystem) {
      root.classList.remove('light');
      root.classList.remove('dark');
      root.classList.add(initialTheme);

      return localStorage.setItem('color-theme', rawTheme);
    }

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('color-theme', rawTheme);
  };

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
