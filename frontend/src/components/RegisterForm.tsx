import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { CREATE_USER, LOGIN } from '../mutations/user';
import { useUserInfo } from '../hooks/useUserInfo';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setName, setUserId, setUsername, setLikedPosts } = useUserInfo();
  const [usernameLocal, setUsernameLocal] = useState<string>('');
  const [nameLocal, setNameLocal] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log(data);
      setName(data.login.name);
      setUserId(data.login.id);
      setUsername(data.login.username);
      setLikedPosts(data.login.likedPosts);
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [createUser, result] = useMutation(CREATE_USER, {
    onCompleted: (result) =>{
      console.log(result.data);
      login({ variables: { username: usernameLocal, password: password } });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createUser({ variables: { name: nameLocal, password: password, username: usernameLocal } });
    setUsernameLocal('');
    setNameLocal('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='Username' value={usernameLocal} onChange={(username) => setUsernameLocal(username.target.value)} />
      <input placeholder='Name' value={nameLocal} onChange={(name) => setNameLocal(name.target.value)} />
      <input placeholder='password' value={password} onChange={(password) => setPassword(password.target.value)} />
      <input type='submit' />
    </form>
  );
};

export default RegisterForm;