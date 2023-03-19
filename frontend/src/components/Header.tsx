import NavBar from './NavBar';

interface ThemeProps {
  theme: string | null
  setTheme: (theme: string) => void
}

const Header = ({ theme, setTheme }: ThemeProps) => {
  return (
    <header>
      <NavBar theme={theme} setTheme={setTheme} />
    </header>
  );
};

export default Header;