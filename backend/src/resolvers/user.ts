import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import crypto from 'crypto';

import { User, LikedPost, Session, Post } from '../models/index';
import { UserEntry, UserLogin, Cookies, EditProfile } from '../types/user';
// import { LikedPostEntry } from '../types/post';

export const userResolvers = {
  Query: {
    allUsers: async () => {
      const users = await User.findAll({
        include: {
          model: LikedPost,
          attributes: ['postId', 'userId'],
          as: 'likedPosts'
        } 
      });

      return users;
    },
    singleUser: async (_root: undefined, args: { id: number }) => {
      const user = await User.findByPk(args.id, {
        include: [
          {
            model: LikedPost,
            as: 'likedPosts',
          },
          {
            separate: true,
            model: Post,
            order: [
              [ 'createdAt', 'DESC']
            ],
            include: [{
              model: User,
              attributes: { include: ['username'] },
            },],
          },
          {
            model: Post,
            order: [
              [ 'createdAt', 'DESC']
            ],
            as: 'userLikedPosts',
            include: [{
              model: User,
              attributes: { include: ['username'] },
            },],
          },
        ],
      });

      return user;
    },
    allLikedPosts: async () => {
      const likedPosts = await LikedPost.findAll({});
      return likedPosts;
    },
    loginOnLoad: async (_root: undefined, _args: undefined, { req, res }: Cookies) => {
      const token = cookie.parse(req.headers.cookie as string).session;      
      if (token) {
        const sessionToken = await Session.findOne({ where: { userToken: token } });
        if (sessionToken) {
          // const user = await User.findByPk(sessionToken.userId, {
          //   include: {
          //     model: LikedPost,
          //     as: 'likedPosts',
          //   }
          // });
          const user = await User.findByPk(sessionToken.userId, {
            include: [
              {
                model: LikedPost,
                as: 'likedPosts',
              },
              {
                separate: true,
                model: Post,
                order: [
                  [ 'createdAt', 'DESC']
                ],
                include: [{
                  model: User,
                  attributes: { include: ['username'] },
                },],
              },
              {
                model: Post,
                order: [
                  [ 'createdAt', 'DESC']
                ],
                as: 'userLikedPosts',
                include: [{
                  model: User,
                  attributes: { include: ['username'] },
                },],
              },
            ],
          });
          if (user) {
            // const returnedUser = {
            //   id: user.id,
            //   username: user.username,
            //   name: user.name,
            //   likedPosts: user.likedPosts,
            // };
            // return { ...returnedUser };
            const cryptoToken = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign(cryptoToken, process.env.SECRET as string);
            await sessionToken.update({ userToken: token });
            res.cookie('session', token, 
              {
                maxAge: 1000*60*60*24,
                httpOnly: true,
              }
            );
            return user;
          } else {
            throw new GraphQLError('User not found', {
              extensions: {
                code: 'INTERNAL_SERVER_ERROR'
              }
            });
          }
        } else {
          throw new GraphQLError('Missing session token', {
            extensions: {
              code: 'FORBIDDEN'
            }
          });
        }
      } else {
        throw new GraphQLError('Missing token', {
          extensions: {
            code: 'FORBIDDEN'
          }
        });
      }
    },
  },
  Mutation: {
    createUser: async (_root: undefined, args: UserEntry) => {
      const { username, name, password } = args;
      const saltRounds = 10;
      const passwordHash: string = await bcrypt.hash(password, saltRounds);

      const newUser = {
        username: username,
        name: name,
        passwordHash: passwordHash
      };

      const user = await User.create(newUser);
      return user;
    },
    login: async (_root: undefined, args: UserLogin, { res }: Cookies) => {
      // const user = await User.findOne({ 
      //   where: { username: args.username },
      //   include: {
      //     model: LikedPost,
      //     attributes: ['postId', 'userId'],
      //     as: 'likedPosts',
      //   },
      // });
      const user = await User.findOne({
        where: { username: args.username },
        include: [
          {
            model: LikedPost,
            as: 'likedPosts',
          },
          {
            separate: true,
            model: Post,
            order: [
              [ 'createdAt', 'DESC']
            ],
            include: [{
              model: User,
              attributes: { include: ['username'] },
            },],
          },
          {
            model: Post,
            order: [
              [ 'createdAt', 'DESC']
            ],
            as: 'userLikedPosts',
            include: [{
              model: User,
              attributes: { include: ['username'] },
            },],
          },
        ],
      });

      // console.log(user);
      // const cookies = req.headers.cookie;
      // console.log(cookie.parse(cookies as string).token);

      const checkPassword = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash);

      if (!(user && checkPassword)) {
        throw new GraphQLError('Invalid Credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          },
        });
      }

      if (user.disabled) {
        throw new GraphQLError('Account disabled, contact admin', {
          extensions: {
            code: 'FORBIDDEN'
          },
        });
      }

      // const objectForToken = {
      //   nothing: 'nothing',
      //   to: 'to',
      //   see: 'see',
      //   here: 'here',
      // };

      // Using the crypto module to generate a pseudo-random string
      // to not include any information even if it's not actionable
      const cryptoToken = crypto.randomBytes(32).toString('hex');
      // console.log(cryptoToken);

      // const returnedUser = {
      //   id: user.id,
      //   username: user.username,
      //   name: user.name,
      //   likedPosts: user.likedPosts,
      // };

      // const token = jwt.sign(objectForToken, process.env.SECRET as string);
      const token = jwt.sign(cryptoToken, process.env.SECRET as string);
      // console.log('crypto', signedCryptoToken);
      // console.log('object token', token);

      const checkSession = await Session.findOne({ where: { user_id: user.id } });
      if (checkSession) {
        await checkSession.update({ userToken: token });
      } else {
        await Session.create({ userToken: token, userId: user.id });
      }

      res.cookie('session', token, 
        {
          maxAge: 1000*60*60*24,
          httpOnly: true,
        }
      );
      // return { ...returnedUser };
      return user;
    },
    logout: async (_root: undefined, _args: undefined, { req, res }: Cookies) => {
      const token = cookie.parse(req.headers.cookie as string).session;
      console.log('logout', token);
      if (!token) {
        throw new GraphQLError('Missing token', {
          extensions: {
            code: 'FORBIDDEN'
          }
        });
      }
      const sessionToken = await Session.findOne({ where: { userToken: token } });
      if (sessionToken) {
        await sessionToken.destroy();
        res.clearCookie('session');
        return null;
      } else {
        throw new GraphQLError('Session doesn\'t exist', {
          extensions: {
            code: 'FORBIDDEN'
          }
        });
      }
    },
    editProfile: async (_root: undefined, args: EditProfile) => {
      const { userId, bio, username } = { ...args };
      const user = await User.findByPk(userId, {
        include: [
          {
            model: LikedPost,
            as: 'likedPosts',
          },
          {
            separate: true,
            model: Post,
            order: [
              [ 'createdAt', 'DESC']
            ],
            include: [{
              model: User,
              attributes: { include: ['username'] },
            },],
          },
          {
            model: Post,
            order: [
              [ 'createdAt', 'DESC']
            ],
            as: 'userLikedPosts',
            include: [{
              model: User,
              attributes: { include: ['username'] },
            },],
          },
        ],
      });
      if (user) {
        await user.update({
          bio: bio,
          username: username,
        });
        return user;
      } else {
        throw new GraphQLError('Failed to update the details');
      }
    }
  }
};