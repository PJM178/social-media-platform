import bcrypt from 'bcrypt';

import User from '../models/user';
import { UserEntry } from '../types/user';

export const userResolvers = {
  Query: {
    allUsers: async () => {
      const users = await User.findAll({});
      return users;
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