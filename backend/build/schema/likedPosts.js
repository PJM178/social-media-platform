const likedPostsTypeDefs = `
  type likedPostResponse {
    type: String
    message: String
    post: Post
  }

  type LikedPost {
    id: ID
    userId: Int!
    postId: Int!
  }

  type Query {
    allLikedPosts: [LikedPost]
  }
`;
export default likedPostsTypeDefs;
