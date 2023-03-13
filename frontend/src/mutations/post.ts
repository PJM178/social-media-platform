import { gql } from '@apollo/client';

export const ADD_POST = gql`
  mutation AddPost (
    $content: String,
    $title: String,
    $userId: Int,
  ) {
      addPost (
      content: $content,
      title: $title,
      userId: $userId
    ) {
      content
      title
    }
  }
`;