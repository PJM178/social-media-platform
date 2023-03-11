const booksTypeDefs = `
  type Book {
    author: String,
    title: String
  }

  type Query {
    books: [Book]
  }
`;

export default booksTypeDefs;