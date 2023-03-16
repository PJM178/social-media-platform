const postTypeDefs = `
  type Post {
    id: ID,
    userId: Int!,
    content: String!,
    title: String!,
    likes: Int,
    createdAt: String!,
    updatedAt: String!,
    user: User
  }

  type Query {
    allPosts: [Post]
  }

  type Mutation {
    addPost(
      content: String,
      title: String,
      likes: Int,
      userId: Int
    ): Post
  }
`;

export default postTypeDefs;