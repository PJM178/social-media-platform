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

export const DELETE_POST = gql`
  mutation DeletePost(
    $id: ID
  ) {
    deletePost (
      id: $id
    ) {
      id
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
    ) {
      type
      message
      post {
        title
        content
        id
        likes
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment(
    $postId: Int!
    $userId: Int!
    $comment: String!
  ) {
    addComment(
      postId: $postId
      userId: $userId
      comment: $comment
    ) {
      id
      userId
      postId
      comment
      createdAt
      updatedAt
    }
  }
`;