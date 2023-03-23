import { GraphQLError } from 'graphql';
import cookie from 'cookie';

import { Post, Session, User, LikedPost } from '../models/index';
import { PostEntry } from '../types/post';
import { Cookies } from '../types/user';

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
    addPost: async (_root: undefined, args: PostEntry, { req }: Cookies) => {
      const token = cookie.parse(req.headers.cookie as string).session;
      if (!token) {
        throw new GraphQLError('Missing token', {
          extensions: {
            code: 'FORBIDDEN'
          }
        });
      }
      const sessionToken = await Session.findOne({ where: { userToken: token } });
      if (sessionToken) {
        console.log('Session validated');
        const post = await Post.create({ ...args });
        return post;
      } else {
        throw new GraphQLError('Cannot validate the user', {
          extensions: {
            code: 'FORBIDDEN'
          }
        });
      }
    },
    editLikes: async (_root: undefined, args: { id: number, type: 'inc' | 'dec', userId: number }) => {
      const { id, type, userId } = { ...args };
      if (type === 'inc') {
        const likedPost = await LikedPost.findOne({ where: { userId: userId, postId: id } });
        if (!likedPost) {
          try {
            const incrementResult = await Post.increment('likes', 
              { by: 1, where: { id: id } }
            );
            console.log(incrementResult[0][1]);
            if (Number(incrementResult[0][1]) === Number(1)) {
              try {
                await LikedPost.create({ userId: userId, postId: id });
                console.log('test');
                return 'Successfully liked the post!';
              } catch (error) {
                console.log(error);
                throw new GraphQLError('Error: failed to save to the database');
              }
            } else {
              throw new GraphQLError('Error: failed to like the post');
            }
          } catch (e) {
            throw new GraphQLError('Error: failed to like the post');
          }
        } else {
          throw new GraphQLError('Already liked the post');
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