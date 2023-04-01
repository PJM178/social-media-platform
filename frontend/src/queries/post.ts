import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query {
    allPosts {
      title
      content
      id
      likes
      user {
        username
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query SinglePost($id: Int!) {
    singlePost(id: $id) {
      title
      content
      id
      likes
      user {
        username
      }
      comments {
        userId
        postId
        comment
        createdAt
        updatedAt
      }
    }
  }
`;

export const USER_POSTS = gql`
  query UserPosts($userId: Int) {
    allPosts(userId: $userId) {
      title
      content
      id
      likes
      user {
        username
      }
    }
  }
`;