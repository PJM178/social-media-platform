const userTypeDefs = `
  type User {
    id: ID,
    username: String!,
    name: String!,
    passwordHash: String!,
    createdAt: String!,
    updatedAt: String!,
    disabled: Boolean!,
    admin: Boolean!,
    """
    likedPosts named so as it's named in Sequelize associations
    the name has be the same as it's in the associations or the query
    returns null
    """
    likedPosts: [LikedPost]
  }

  type Token {
    value: String!
  }

  type Query {
    allUsers: [User]
    singleUser(id: Int): User 
  }

  type Mutation {
    createUser(
      username: String!,
      name: String!,
      password: String!,
    ): User
    login(
      username: String!
      password: String!
    ): User
  }
`;

export default userTypeDefs;