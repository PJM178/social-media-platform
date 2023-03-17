import { GraphQLError } from 'graphql';

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

      return posts;
    },
  },
  Mutation: {
    addPost: async (_root: PostEntry, args: PostEntry) => {
      console.log(args);
      // const jorma = {
      //   userId: 2,
      //   content: 'testi',
      //   title: 'testi',
      // };
      const post = await Post.create({ ...args });
      return post;
    },
    editLikes: async (_root: PostEntry, args: { id: number, type: 'inc' | 'dec' }) => {
      const { id, type } = { ...args };
      if (type === 'inc') {
        try {
          const incrementResult = await Post.increment('likes', 
            { by: 1, where: { id: id } }
          );
          console.log(incrementResult[0][1]);
          if (Number(incrementResult[0][1]) === Number(1)) {
            return 'Successfully incremented likes';
          } else {
            return 'Failed to incremented likes';
          }
        } catch (e) {
          throw new GraphQLError('Failed to increment likes');
        }
      } else if (type === 'dec') {
        try {
          const decrementResult = await Post.decrement('likes', 
            { by: 1, where: { id: id } }
          );
          console.log(decrementResult[0][1]);
          if (Number(decrementResult[0][1]) === Number(1)) {
            return 'Successfully decremented likes';
          } else {
            return 'Failed to decrement likes';
          }
        } catch (e) {
          throw new GraphQLError('Failed to increment likes');
        }
      } else {
        throw new GraphQLError('Something went wrong', {
          extensions: {
            code: 'BAD_USER_INPUT'
          },
        });
      }
    }
  },
};