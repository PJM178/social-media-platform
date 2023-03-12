import Post from '../models/post';

import { PostEntry } from '../types/post';

export const postResolvers = {
  Query: {
    allPosts: async () => {
      const posts = await Post.findAll({
        order: [
          ['likes', 'DESC']
        ],
      });
      return posts;
    },
  },
  Mutation: {
    addPost: async (_root: unknown, args: PostEntry) => {
      console.log(args);
      // const jorma = {
      //   userId: 2,
      //   content: 'testi',
      //   title: 'testi',
      // };
      const post = await Post.create({ ...args });
      return post;
    },
  },
};