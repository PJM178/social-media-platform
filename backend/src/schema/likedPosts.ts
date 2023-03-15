const likedPostsTypeDefs = `
  type LikedPost {
    id: ID
    userId: Int
    postId: Int
  }

  type Query {
    allLikedPosts: [LikedPost]
  }
`;

export default likedPostsTypeDefs;