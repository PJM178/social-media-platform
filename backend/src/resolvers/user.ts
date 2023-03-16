import bcrypt from 'bcrypt';

import { User, LikedPost } from '../models/index';
import { UserEntry } from '../types/user';
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
    singleUser: async (_root: unknown, args: { id: number }) => {
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
    createUser: async (_root: unknown, args: UserEntry) => {
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
    }
  }
};