const postTypeDefs = `
  type Post {
    id: ID,
    userId: Int,
    content: String,
    title: String,
    likes: Int,
    createdAt: String,
    updatedAt: String
  }

  type Query {
    allPosts: [Post]
  }
`;

export default postTypeDefs;