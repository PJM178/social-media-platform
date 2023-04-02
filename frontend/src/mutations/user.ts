import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      username
      bio
      likedPosts {
        postId
        userId
      }
      posts {
        title
        content
        id
        likes
        user {
          username
        }
      }
      userLikedPosts {
        title
        content
        id
        likes
        user {
          username
        }
      }
      createdAt
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

export const EDIT_PROFILE = gql`
  mutation EditProfile($userId: Int!, $username: String!, $bio: String) {
    editProfile(userId: $userId, username: $username, bio: $bio) {
      id
      name
      username
      bio
      likedPosts {
        postId
        userId
      }
      posts {
        title
        content
        id
        likes
        user {
          username
        }
      }
      userLikedPosts {
        title
        content
        id
        likes
        user {
          username
        }
      }
      createdAt
    }
  }
`;