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
    allPosts(userId: Int): [Post]
    singlePost(id: Int!): Post
  }

  type Mutation {
    addPost(
      content: String,
      title: String,
      likes: Int,
      userId: Int
    ): Post
    editLikes(
      id: ID,
      type: String,
      userId: String
    ): likedPostResponse
  }
`;

export default postTypeDefs;