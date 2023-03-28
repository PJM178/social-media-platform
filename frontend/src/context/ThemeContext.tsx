import { createContext, ReactNode, useState } from 'react';

interface ThemeContextProps {
  theme: string | null
  setTheme: React.Dispatch<React.SetStateAction<string | null>>
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: null,
  setTheme: () => null,
});

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string | null>(window.localStorage.getItem('theme'));

  const defaultValues: ThemeContextProps = {
    theme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={defaultValues} >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;