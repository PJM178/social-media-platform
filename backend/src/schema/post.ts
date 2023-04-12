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
    comments: [Comment]
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
    deletePost(
      id: ID
    ): Post
    editLikes(
      id: ID,
      type: String,
      userId: String
    ): likedPostResponse
    addComment(
      postId: Int!,
      userId: Int!,
      comment: String
    ): Comment
  }
`;

export default postTypeDefs;