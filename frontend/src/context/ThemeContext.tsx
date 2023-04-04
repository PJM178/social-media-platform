import { createContext, ReactNode, useState } from 'react';

interface ThemeContextProps {
  theme: string | null
  setTheme: React.Dispatch<React.SetStateAction<string | null>>
  errorMessage: string | null
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: null,
  setTheme: () => null,
  errorMessage: null,
  setErrorMessage: () => null,
});

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string | null>(window.localStorage.getItem('theme'));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues: ThemeContextProps = {
    theme,
    setTheme,
    errorMessage,
    setErrorMessage,
  };

  return (
    <ThemeContext.Provider value={defaultValues} >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;