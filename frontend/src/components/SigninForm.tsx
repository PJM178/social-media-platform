import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { useUserInfo } from '../hooks/useUserInfo';

import { UserSignIn } from '../types/user';
import { LOGIN } from '../mutations/user';

const SigninForm = () => {
  const navigate = useNavigate();
  const { setName, setUserId, setUsername, setLikedPosts } = useUserInfo();

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    }
  });

  const validationSchema: yup.Schema<UserSignIn> = yup.object().shape({
    username: yup
      .string()
      .min(3, 'Username too short')
      .max(20, 'Username too long')
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  const {
    register, handleSubmit, reset,
    formState, formState: { errors, isSubmitSuccessful }
  } = useForm<UserSignIn>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (values: UserSignIn) => {
    console.log(values);
    login({ variables: { username: values.username, password: values.password } });
  };

  useEffect(() => {
    if (data && isSubmitSuccessful) {
      // reset();
      console.log(data, loading);
      setName(data.login.name);
      setUserId(data.login.id);
      setUsername(data.login.username);
      setLikedPosts(data.login.likedPosts);
      navigate('/');
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div>{error.message}</div>}
      <input placeholder="Username" {...register('username')} />
      {errors.username && <div>{errors.username.message}</div>}
      <input placeholder="Password" {...register('password')} />
      {errors.password && <div>{errors.password.message}</div>}
      <input type="submit" value="Sign in" />
    </form>
  );
};

export default SigninForm;