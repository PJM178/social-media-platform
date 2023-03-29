import { gql } from '@apollo/client';

export const GET_USER = gql`
  query SingleUser($singleUserId: Int) {
    singleUser(id: $singleUserId) {
      id
      name
      username
      likedPosts {
        postId
        userId
      }
      posts {
        title
        content
        id
        likes
      }
      userLikedPosts {
        title
        content
        id
        likes
      }
    }
  }
`;

export const LOGIN_ON_LOAD = gql`
  query LoginOnLoad {
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