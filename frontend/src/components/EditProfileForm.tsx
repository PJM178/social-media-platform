import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_PROFILE } from '../mutations/user';
import { useUserInfo } from '../hooks/useUserInfo';

import { EditProfile, UserProfileType, SingleUser } from '../types/user';
import { GET_USER } from '../queries/user';

interface FormValues {
  bio?: string
  username: string
}

const EditProfileForm = ({ userData }: { userData: SingleUser | undefined }) => {
  const [formValues, setFormValues] = useState<FormValues | null>(null);

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
    register, handleSubmit, reset, setValue,
    formState, formState: { errors, isSubmitSuccessful }
  } = useForm<EditProfile>({ resolver: yupResolver(validationSchema) });
  const { userId } = useUserInfo();
  const [editProfile, { data, loading, error }] = useMutation(EDIT_PROFILE, {
    // refetchQueries: [{ query: GET_USER }],
    onError: (error) => {
      console.log(error);
      if (formValues) {
        setValue('bio', formValues?.bio);
        setValue('username', formValues.username);
      }
    },
    update: (store, { data: { editProfile } }) => {
      const data = store.readQuery<SingleUser | undefined>({ query: GET_USER,  variables: { singleUserId: Number(userId) } });
      console.log(editProfile);
      console.log(data);
      const newData = { singleUser: { ...data?.singleUser } };
      newData.singleUser.bio = editProfile.bio;
      newData.singleUser.username = editProfile.username;
      console.log(newData);
      store.writeQuery<SingleUser | undefined>({ query: GET_USER, data: newData as SingleUser });
    }
  });

  const onSubmit = (values: EditProfile) => {
    editProfile({ variables: { username: values.username, bio: values.bio, userId: Number(userId) },
      optimisticResponse: {
        editProfile: {
          bio: values.bio,
          createdAt: userData?.singleUser.createdAt,
          id: userData?.singleUser.id,
          likedPosts: userData?.singleUser.likedPosts,
          name: userData?.singleUser.name,
          posts: userData?.singleUser.posts,
          userLikedPosts: userData?.singleUser.userLikedPosts,
          username: values.username,
          __typeName: userData?.singleUser.__typename,
        }
      }
    });
    setFormValues({ username: values.username, bio: values.bio });
    setValue('bio', '');
    setValue('username', '');
  };
  console.log('test');
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