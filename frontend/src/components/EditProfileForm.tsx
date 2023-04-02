import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_PROFILE } from '../mutations/user';
import { useUserInfo } from '../hooks/useUserInfo';

import { EditProfile } from '../types/user';

const EditProfileForm = () => {
  const { userId } = useUserInfo();
  const [editProfile, { data, loading, error }] = useMutation(EDIT_PROFILE, {
    onError: (error) => console.log(error),
  });
  const validationSchema: yup.Schema<EditProfile> = yup.object().shape({
    username: yup
      .string()
      .min(3, 'Username too short')
      .max(20, 'Username too long')
      .required('Username is required'),
    bio: yup
      .string(),
  });

  const {
    register, handleSubmit, reset,
    formState, formState: { errors, isSubmitSuccessful }
  } = useForm<EditProfile>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (values: EditProfile) => {
    console.log(values);
    editProfile({ variables: { username: values.username, bio: values.bio, userId: Number(userId) } });
  };

  useEffect(() => {
    if (data && isSubmitSuccessful) {
      console.log(data);
      reset();
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {error && <div>{error.message}</div>} */}
      <input placeholder="Username" {...register('username')} />
      {errors.username && <div>{errors.username.message}</div>}
      <input placeholder="Bio" {...register('bio')} />
      {errors.bio && <div>{errors.bio.message}</div>}
      <input type="submit" value="Edit Profile" />
    </form>
  );
};

export default EditProfileForm;