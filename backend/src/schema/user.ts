const userTypeDefs = `
  type User {
    id: ID,
    username: String!,
    name: String!,
    passwordHash: String!,
    createdAt: String,
    updatedAt: String
    likedPost: LikedPost
  }

  type Query {
    allUsers: [User]
  }

  type Mutation {
    createUser(
      username: String!,
      name: String!,
      password: String!,
    ): User
  }
`;

export default userTypeDefs;