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

export const SINGLE_POST = gql`
  query SinglePost($id: Int!) {
    singlePost(id: $id) {
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