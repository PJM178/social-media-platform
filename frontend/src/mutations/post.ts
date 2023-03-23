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

export const EDIT_LIKES = gql`
  mutation EditLikes(
    $id: ID, 
    $type: String
    $userId: String
  ) { 
    editLikes(
    id: $id, 
    type: $type,
    userId: $userId
    )
  }
`;