import { Post, User } from '../models/index';

import { PostEntry } from '../types/post';

export const postResolvers = {
  Query: {
    allPosts: async () => {
      const posts = await Post.findAll({
        order: [
          ['updatedAt', 'DESC']
        ],
        include: {
          model: User,
          attributes: { include: ['username'] },
          // as: 'userposts',
          // attributes: ['username'],
          // through: {
          //   attributes: []
          // }
          // include: {
          //   model: LikedPosts,
          //   attributes: { include: ['postId'] }
          // },
        },
      });
      console.log(posts);
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