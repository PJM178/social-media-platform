const commentTypeDefs = `
  type Comment {
    id: ID,
    userId: Int!,
    postId: Int!
    comment: String!,
    createdAt: String!,
    updatedAt: String!,
    user: User,
  }
`;

export default commentTypeDefs;