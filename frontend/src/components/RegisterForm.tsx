import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { CREATE_USER } from '../mutations/user';

const RegisterForm = () => {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error);
    }
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await createUser({ variables: { name: name, password: password, username: username } });
    setUsername('');
    setName('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='Username' value={username} onChange={(username) => setUsername(username.target.value)} />
      <input placeholder='Name' value={name} onChange={(name) => setName(name.target.value)} />
      <input placeholder='password' value={password} onChange={(password) => setPassword(password.target.value)} />
      <input type='submit' />
    </form>
  );
};

export default RegisterForm;