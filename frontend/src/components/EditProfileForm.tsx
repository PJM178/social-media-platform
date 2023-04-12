import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { EDIT_PROFILE } from '../mutations/user';
import { useUserInfo } from '../hooks/useUserInfo';
import { useTheme } from '../hooks/useTheme';
import { EditProfile, SingleUser } from '../types/user';
import { PostType } from '../types/post';
import { GET_USER } from '../queries/user';
import { GET_ALL_POSTS } from '../queries/post';

interface FormValues {
  bio?: string
  username: string
}


const EditProfileForm = ({ userData }: { userData: SingleUser | undefined }) => {
  const location = useLocation();
  const { userId, setUsername, username } = useUserInfo();
  const { setErrorMessage } = useTheme();
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [previousUsername, setPreviousUsername] = useState<string | null>(username);

  const validationSchema: yup.Schema<EditProfile> = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username too short')
      .max(20, 'Username too long'),
    bio: yup
      .string(),
  });

  const {
    register, handleSubmit, reset, setValue,
    formState, formState: { errors, isSubmitSuccessful }
  } = useForm<EditProfile>({ resolver: yupResolver(validationSchema) });
  const [editProfile, { data, loading, error }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: (error) => {
      console.log(error);
      console.log(error.message);
      setErrorMessage(error.message);
      if (formValues) {
        setValue('bio', formValues.bio);
        setValue('username', formValues.username);
        setUsername(previousUsername);
        window.history.replaceState(location.pathname, '', `/profile/${previousUsername}`);
      }
    },
    update: (store, { data: { editProfile } }) => {
      const data = store.readQuery<SingleUser | undefined>({ query: GET_USER,  variables: { singleUserId: Number(userId) } });
      const newData = { singleUser: { ...data?.singleUser } };
      newData.singleUser.bio = editProfile.bio;
      newData.singleUser.username = editProfile.username;
      // stringify makes a deep copy instead of shallow copy of spread - allows changing posts
      const newPosts: [PostType] = JSON.parse(JSON.stringify(newData.singleUser.posts));
      newPosts?.forEach(post => post.user.username = editProfile.username );
      newData.singleUser.posts = newPosts;
      store.writeQuery<SingleUser | undefined>({ query: GET_USER, data: newData as SingleUser });
    },
    onCompleted: () => setPreviousUsername(username)
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
    setErrorMessage(null);
    setPreviousUsername(username);
    setFormValues({ username: values.username, bio: values.bio });
    setUsername(values.username);
    window.history.replaceState(location.pathname, '', `/profile/${values.username}`);
    setValue('bio', '');
    setValue('username', '');
  };

  useEffect(() => {
    if (data && isSubmitSuccessful) {
      console.log(data);
      console.log('jorma');
      reset();
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      {/* {error && <div>{error.message}</div>} */}
      <input placeholder="Username" {...register('username')} />
      {errors.username && <div>{errors.username.message}</div>}
      <input placeholder="Bio" {...register('bio')} />
      {errors.bio && <div>{errors.bio.message}</div>}
      <input type="submit" value="Save changes" />
    </form>
  );
};

export default EditProfileForm;