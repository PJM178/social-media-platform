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
          ['createdAt', 'DESC']
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
    singlePost: async (_root: undefined, args: { id: number }) => {
      const { id } = { ...args };
      console.log('singlepost');
      const post = await Post.findByPk(id,{
        include: {
          model: User,
          attributes: { include: ['username'] },
        },
      });
      if (post) {
        return post;
      } else {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        });
      }
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
        console.log('liking the post', id, type, userId);
        console.log(likedPost);
        if (!likedPost) {
          try {
            const incrementResult = await Post.increment('likes', 
              { by: 1, where: { id: id } }
            );
            console.log(incrementResult[0][1]);
            console.log(incrementResult[0][0][0 as unknown as keyof Post].title);
            console.log({ ...incrementResult[0][0][0 as unknown as keyof Post] });
            if (Number(incrementResult[0][1]) === Number(1)) {
              try {
                await LikedPost.create({ userId: userId, postId: id });
                return { type: 'inc', message: 'Successfully liked the post!', post: { ...incrementResult[0][0][0 as unknown as keyof Post] as Post }  };
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
        console.log('dec');
        const likedPost = await LikedPost.findOne({ where: { userId: userId, postId: id } });
        console.log(likedPost);
        if (likedPost) {
          try {
            const decrementResult = await Post.decrement('likes', 
              { by: 1, where: { id: id } }
            );
            console.log(decrementResult[0][1]);
            if (Number(decrementResult[0][1]) === Number(1)) {
              try {
                await likedPost.destroy();
                return { type: 'dec', message: 'You disliked the post...' };
              } catch (e) {
                console.log(e);
                throw new GraphQLError('Error: failed to save to the database');
              }
            } else {
              throw new GraphQLError('Error: failed to dislike the post');
            }
          } catch (e) {
            throw new GraphQLError('Error: failed to dislike the post');
          }
        } else {
          throw new GraphQLError('Already disliked the post');
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