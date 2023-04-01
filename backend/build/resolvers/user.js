import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { User, LikedPost, Session, Post } from '../models/index';
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
        singleUser: async (_root, args) => {
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
                            ['createdAt', 'DESC']
                        ],
                        include: [{
                                model: User,
                                attributes: { include: ['username'] },
                            },],
                    },
                    {
                        model: Post,
                        order: [
                            ['createdAt', 'DESC']
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
        loginOnLoad: async (_root, _args, { req }) => {
            const token = cookie.parse(req.headers.cookie).session;
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
                                    ['createdAt', 'DESC']
                                ],
                                include: [{
                                        model: User,
                                        attributes: { include: ['username'] },
                                    },],
                            },
                            {
                                model: Post,
                                order: [
                                    ['createdAt', 'DESC']
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
                        return user;
                    }
                    else {
                        throw new GraphQLError('User not found', {
                            extensions: {
                                code: 'INTERNAL_SERVER_ERROR'
                            }
                        });
                    }
                }
                else {
                    throw new GraphQLError('Missing session token', {
                        extensions: {
                            code: 'FORBIDDEN'
                        }
                    });
                }
            }
            else {
                throw new GraphQLError('Missing token', {
                    extensions: {
                        code: 'FORBIDDEN'
                    }
                });
            }
        },
    },
    Mutation: {
        createUser: async (_root, args) => {
            const { username, name, password } = args;
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const newUser = {
                username: username,
                name: name,
                passwordHash: passwordHash
            };
            const user = await User.create(newUser);
            return user;
        },
        login: async (_root, args, { res }) => {
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
                            ['createdAt', 'DESC']
                        ],
                        include: [{
                                model: User,
                                attributes: { include: ['username'] },
                            },],
                    },
                    {
                        model: Post,
                        order: [
                            ['createdAt', 'DESC']
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
            const objectForToken = {
                nothing: 'nothing',
                to: 'to',
                see: 'see',
                here: 'here',
            };
            // const returnedUser = {
            //   id: user.id,
            //   username: user.username,
            //   name: user.name,
            //   likedPosts: user.likedPosts,
            // };
            const token = jwt.sign(objectForToken, process.env.SECRET);
            const checkSession = await Session.findOne({ where: { user_id: user.id } });
            if (checkSession) {
                await checkSession.update({ userToken: token });
                await checkSession.save();
            }
            else {
                await Session.create({ userToken: token, userId: user.id });
            }
            res.cookie('session', token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });
            // return { ...returnedUser };
            return user;
        },
        logout: async (_root, _args, { req, res }) => {
            const token = cookie.parse(req.headers.cookie).session;
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
            }
            else {
                throw new GraphQLError('Session doesn\'t exist', {
                    extensions: {
                        code: 'FORBIDDEN'
                    }
                });
            }
        },
    }
};
