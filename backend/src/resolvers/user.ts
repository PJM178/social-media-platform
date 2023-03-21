import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { User, LikedPost, Session } from '../models/index';
import { UserEntry, UserLogin, Cookies } from '../types/user';
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
        include: {
          model: LikedPost,
          as: 'likedPosts',
        }
      });

      return user;
    },
    allLikedPosts: async () => {
      const likedPosts = await LikedPost.findAll({});
      return likedPosts;
    }
  },
  Mutation: {
    createUser: async (_root: undefined, args: UserEntry, context: string) => {
      console.log(context);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: async (_root: undefined, args: UserLogin, { req, res }: Cookies) => {
      const user = await User.findOne({ 
        where: { username: args.username },
        include: {
          model: LikedPost,
          attributes: ['postId', 'userId'],
          as: 'likedPosts',
        },
      });
      console.log(user);
      const cookies = req.headers.cookie;
      console.log(cookie.parse(cookies as string).token);

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

      const userForToken = {
        id: user.id
      };

      const returnedUser = {
        id: user.id,
        username: user.username,
        name: user.name,
        likedPosts: user.likedPosts,
      };

      const token = jwt.sign(userForToken, process.env.SECRET as string);

      const checkSession = await Session.findOne({ where: { user_id: user.id } });
      if (checkSession) {
        await checkSession.update({ userToken: token });
        await checkSession.save();
      } else {
        await Session.create({ userToken: token, userId: user.id });
      }

      res.cookie('token', token, 
        {
          maxAge: 1000*60*60*24,
          httpOnly: true,
        }
      );
      console.log(returnedUser);
      return { ...returnedUser };
    },
    logout: async (_root: undefined, _args: undefined, { req, res }: Cookies) => {
      const token = cookie.parse(req.headers.cookie as string).token;
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
        res.clearCookie('token');
        return null;
      } else {
        throw new GraphQLError('Session doesn\'t exist', {
          extensions: {
            code: 'FORBIDDEN'
          }
        });
      }
    }
  }
};