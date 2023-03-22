import NavBar from './NavBar';

interface HeaderProps {
  theme: string | null
  setTheme: (theme: string) => void
}

const Header = ({ theme, setTheme }: HeaderProps) => {
  return (
    <header>
      <NavBar theme={theme} setTheme={setTheme} />
    </header>
  );
};

export default Header;