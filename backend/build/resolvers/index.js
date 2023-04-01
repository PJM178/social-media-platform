import lodash from 'lodash';
import { postResolvers } from './post';
import { userResolvers } from './user';
const resolvers = lodash.merge(postResolvers, userResolvers);
export default resolvers;
