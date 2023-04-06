import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ADD_COMMENT } from '../mutations/post';
import { GET_SINGLE_POST } from '../queries/post';
import { useUserInfo } from '../hooks/useUserInfo';
import { SinglePost } from '../types/post';

// types
interface CommentFormTypes {
  comment: string
}

interface SinglePostType {
  post: SinglePost
}

const CommentForm = ({ post }: SinglePostType) => {
  const { userId } = useUserInfo();
  const { id } = useParams();
  console.log('comment form passed data', post);
  const [addComment, { data, loading, error }] = useMutation<Comment>(ADD_COMMENT, {
    refetchQueries: [{ query: GET_SINGLE_POST, variables: { id: Number(id) } }],
    // onError: (error) => {
    //   console.log(error);
    // },
    // onCompleted: (data) => console.log(data),
  });

  const validationSchema: yup.Schema<CommentFormTypes> = yup.object().shape({
    comment: yup
      .string()
      .required('Comment cannot be empty')
      .min(3, 'At least 3 characters is required')
      .max(500, 'Comment length over 500 characters'),
  });

  const {
    register, handleSubmit, reset, setValue,
    formState, formState: { errors, isSubmitSuccessful }
  } = useForm<CommentFormTypes>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (values: CommentFormTypes) => {
    addComment({ variables: { comment: values.comment, userId: Number(userId), postId: Number(post.id) } });
  };

  useEffect(() => {
    if (data && isSubmitSuccessful) {
      console.log('submit successful');
      reset();
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {error && <div>{error.message}</div>} */}
      <textarea placeholder="Comment" {...register('comment')} />
      {errors.comment && <div>{errors.comment.message}</div>}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CommentForm;