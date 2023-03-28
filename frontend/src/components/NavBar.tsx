import { useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../mutations/user';

import Theme from './Theme';

const NavBar = () => {
  const client = useApolloClient();
  const { name, resetUserInfo } = useUserInfo();
  const [logout, { data, loading, error }] = useMutation(LOGOUT,{
    onError: (error) => {
      console.log(error);
    }
  });
  console.log('navbar');

  const handleSignOut = async () => {
    await logout();
    console.log(data, loading, error);
    window.localStorage.removeItem('userLoggedIn');
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
          {/* {userLoading && <div className='loading nav-link'>...</div>} */}
          {!name && <div className='nav-link'><Link to='/register' state={{ state: 'register' }}>Register</Link></div>}
          {name && <div className='nav-link'>Profile</div>}
          {/* <div className='nav-link'><Link to='/signin' state={{ state: 'signin' }}>Sign in</Link></div> */}
          {name
            ? <div className='nav-link sign-out-button' onClick={() => handleSignOut()}>Sign out</div>
            : <div className='nav-link'><Link to='/signin' state={{ state: 'signin' }}>Sign in</Link></div>
          }
          <Theme />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;