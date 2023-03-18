import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import { User, LikedPost, Session } from '../models/index';
import { TokenUser, UserEntry, UserLogin } from '../types/user';
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
    login: async (_root: undefined, args: UserLogin, context: TokenUser) => {
      const user = await User.findOne({ where: { username: args.username } });
      console.log(context);
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

      const userForToken = {
        username: user.username,
        id: user.id
      };

      const token = jwt.sign(userForToken, process.env.SECRET as string);

      const checkSession = await Session.findOne({ where: { user_id: user.id } });
      if (checkSession) {
        await checkSession.update({ userToken: token });
        await checkSession.save();
      } else {
        await Session.create({ userToken: token, userId: user.id });
      }

      return { value: token };
    }
  }
};