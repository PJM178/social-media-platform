import { useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../mutations/user';

interface ThemeProps {
  theme: string | null
  setTheme: (theme: string) => void
}

const NavBar = ({ theme, setTheme }: ThemeProps) => {
  const client = useApolloClient();
  const { name, resetUserInfo } = useUserInfo();
  const [logout, { data, loading, error }] = useMutation(LOGOUT,{
    onError: (error) => {
      console.log(error);
    }
  });

  const handleTheme = (theme: string) => {
    setTheme(theme);
  };

  const handleSignOut = async () => {
    await logout();
    console.log(data, loading, error);
    client.resetStore();
    resetUserInfo();
    console.log('sign out');
  };

  return (
    <nav>
      <div className='header-nav-container'>
        <div className='logo-container'>
          <div className='logo'>PURO</div>
        </div>
        <div className='nav-link-container'>
          {!name && <div className='nav-link'><Link to='/register' state={{ state: 'register' }}>Register</Link></div>}
          {name && <div className='nav-link'>Profile</div>}
          {/* <div className='nav-link'><Link to='/signin' state={{ state: 'signin' }}>Sign in</Link></div> */}
          {name
            ? <div className='nav-link' onClick={() => handleSignOut()}>Sign out</div>
            : <div className='nav-link'><Link to='/signin' state={{ state: 'signin' }}>Sign in</Link></div>
          }
          <div className='theme-container'>
            {theme === 'light' || theme === null
              ? <img className='theme' onClick={() => handleTheme('dark')} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFKklEQVR4nO2bWYhcRRSGK6MouAVNomYE11Ghcbpv/X/dnnEgzoMbEtCgtiCCiMuby4Mg7gu4RAQJefDBhbi/KEQwgtGRSFAfNO5ENEERDIqJOpPgJNE4GTn0HWnaU3fu9DrTtz6ol7613b+rTp06VdeYQCAQCAQCgUAgEAgEAoFWE0XRMmvtuSQvJFlxzl0wOjp6aMsbWuiQLJO8h+QYyT9ITivpU5KLTd4ZGho6AcD9JLd7hNLS7SavkFwOYC2AvXMQbCY9YfJGpVI5hOQtJCcaEGwawD9i90yeKJVKJ5Hc3IhgSdpFcqXJE865UZI7mxBti7W23+QJkqsA7EsRZQrA6yTXe6bnh+Vy+RiTQ9EOpNist5xzZ4vPBmC38vwHeWbyNj3hH2kTzrnrZ/KSfEzJcxDACpPDhWCnZ5R9b60dqFtpdyh5nzd5olIVwrd6fiE+XG1+2UppbkcURWeaPMGqn6aJtn14ePi4+vwAHlfyjpk8EcfxiZpzC2BPFEUFrQyATYpwN5s8AWCtx65d5SujCW2tdSZnG/a9inBv+8oMDAwc7pnWR5i8QPI+RYC/4jg+a5apXV9mv8kRizyhoXVphUierEzrfVKfyVEQcloRYTitnKyyWjlt9e1JWI3c/s9ny1C0T9tdOOfOMXmA1XB3/Wh7OGPZrxTRbzR5AMDvinAXZyz7nCLcm6bXiaJomfLiU1lDQQCu0RaInrdzJIcU4X7NWl4E9vh/bT9bsNaeR/Ipkg8Vi8XjTScheZHy0lvnWMdL2qiz1p7Sxn6vlGBCTXvfikNuOoW19nJFuM1zqYPkoMTfFPE+aMfLSNgLwG+N2uW2CQdg01zrIfmKZ/uV6kQ30M7i5GBba2tVK9tqZKp+0kA9y1OODde1YuSJHSP5kacNCS6cb7q5OAD4qcG6Kr6XkkObZmxeshD86Ks/STCdguRSpQMHC4XCUQ3Wp50//LdgyGo7F1dFDoMkDK/ZUCV19l4KFEMr/3ATAYOn014wEXADgJtke1YrZLFYPNI5F5O8NQmSTmUQTOr8xXQaAO8qHXmgiSpFvEezvHCdmPvnUqYubTCdBsDdyot81my9zrkrSI43Icb0vL4F5apTQ+vMYLN1J6vtyxlt1GyjcjeA17Rn1tqi6QKLSG5TOvpsqxoQWwbgxQavhu1Ipv5SAK8q/fzazLfQealUOrWV7cjeluTVJJ+RmJ/ntsCELAwAVie+WZ+UlYPw2m1WTbrDdIti1bmcVDq1vs1N9w0ODh4rf5BM60KhcJgvo4SrlNG2p+uRGJJrtKkiRr6rHasuYNd57N7qeXFESH0VHC+Xy6d1q18kz/D0a1fXR9sMcgrvMdDbOh7zSgKtAL7z9OkGM58u3UC/1iDT4uM4jpd0qi8ymgB87hFt48yiMW+w1vZLFNjT4W+cc6e3uw9yVyXlM4CfuzH6MwFgRYrPJfbmyna1LVEW7YZnkiZnO+/tOs65S2e5yvpGK/28JBKyMaW9Awvm5jrJy2a5PP23HBE2s+WRbx8AvCAOd0o7kwtGtNppm2Lz6m9sPighqZGRkaNNyu7BOXcJyUdIfpklZLRgPyyx1vYDeL+BPeYWku8l12O3Jn9AphhbksbEvzQLnD6S12qBzzakcQC3iXtkeoWh6g5jjWdv22z6E8CTPf19RLEaGLg3xbPPnORAWW5N9bRgGnLvF8BdAN7JMpUlj+QleScAqpXmkTiOl0hkOfkOojLzebn81sltWyAQCAQCgUAgEAgEAgGTH/4FhS+G66NUF6IAAAAASUVORK5CYII=" />
              : <img className='theme' onClick={() => handleTheme('light')} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwklEQVR4nO2bS08UQRCAWzDRKBGvclCJIBq5+Ip4UfSgAeMRUVZ8IeoR9ScYETmJJAYvon+AEM8+LqInBTURxF/gWdQDiZ9ppzeuS/fsPNzdmdn6kkk2k+6qmtp+1FT1KCUIgiAIgiAIgiAIglAugNXAEaBT/y6boiwBrAXe8JfX+l617Uo8wGVWMlBtuxIPMGJx3Ei17Uo8iOOiAQxbRtxwRHG1A5CzOK5P1QJAB/AQGAWaIoQi0wVOmwLqQ8poMrq1DR0qDQAHgeWCB/8KtEeQ0wZsj9Cv3ejMo205oJIOMGGZavpBdlVA964ip+V5oJIO3hSx8QmoK6PeemDeoTv54Qze+mL71zXbyqi31aFT27JJpQFWrjOab8C6MupcDyxZnBZ6fa0qeOvNfIHTegP0aQaumVjusbmGzb3mAP17ja780lD2dbWc606LHg0+beqAC8AcpdFtzvutlWbktYQNYVIFsB/4SHjeA/tULQKcAr4TnZ9Av6olgDPAL+KjZZxWtQDe9Pzh44wFYAwYMteYuedCy9qrsgzeRvDB4QC9Ax/36dsFfPbZNMoWXFcdvB3RxjNgQ4D+jcBzh4xzKqtgDznmgzityHm2kTersgiw1TFSjkWQ1e2QVTJITko1asCkukdMhJ9zlfNM9F/MQgz9ixZ5V3xyfGeNjXl7BypePcMzpLCEV8h0iJT4vRg23LfIu21ptwp46rB1pqJ1W+Ao/rRZ+jyxtBuKYcMNi7xJS7udJWztjGpDFKM7SxjTaukzaWl3I4YNNy3yHjkyyX4cimpD1Kk64zBkKsRUHYthw3iQqWraFtYwCnlV8WQA3uZwqWhz6HMZAlytwOYw6PNH54o2h4vAGpV0gC2O99OuCLJOOkbQVpVFgFnLw+pgtjGEjI3AF4ucdyqrAP2OkfIiiPOM0146ZJxVGX/Jn3M8uB553T59TzhG2p/RlumXfA2wp0QCc9HsmNfNNe7jMIys3aqGsr+/iI+W0aNqCaDnP6TOs7uu+aEzt46dthTvMj098cqDrQHKg3q3fRvAYW9NlsOvPNiQ6vIg/xaklwIWpHWQPAjcMu+2k+a3Phe8OWBBOl/Nn09dQZrqHIFoSPURCOTQTWTHjTrWJznm5YccLIx3/nc5zjpj0t07bJnkzB5l1WhDzci7G/ZQn8mdFdYIpsPWBbROo3siNU6Li4nTisnFFpx1gDsWx8kHIqWQT5IiIo6LiKmwF3MpqryaAa96NlNUwkt+NSoJ4IUkh82VziyHIAiCIAiCIAiCIAgqFfwGQIxYhfjb5GIAAAAASUVORK5CYII=" />
            }
          </div>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;