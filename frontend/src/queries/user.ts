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
    }
  }
`;