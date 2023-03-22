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

export const LOGIN_ON_LOAD = gql`
  mutation LoginOnLoad {
    loginOnLoad {
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

export const LOGOUT = gql`
  mutation Logout {
    logout {
      name
    }
  }
`;