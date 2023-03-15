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
          attributes: { include: ['postId'] }
        }
      });

      return users;
    },
    allLikedPosts: async () => {
      const likedPosts = await LikedPost.findAll({});
      return likedPosts;
    }
  },
  Mutation: {
    createUser: async (_root: unknown, args: UserEntry) => {
      const { username, name, password } = args;
      console.log(username, name, password);
      const saltRounds = 10;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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