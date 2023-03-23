import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      name
      id
      username
      likedPosts {
        postId
        userId
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $name: String!) {
    createUser(username: $username, password: $password, name: $name) {
      name
      username
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      name
    }
  }
`;