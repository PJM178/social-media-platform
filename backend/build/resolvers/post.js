import { GraphQLError } from 'graphql';
import cookie from 'cookie';
import { Post, Session, User, LikedPost, Comment } from '../models/index';
export const postResolvers = {
    Query: {
        allPosts: async (_root, args) => {
            const { userId } = { ...args };
            if (userId) {
                const userPosts = await Post.findAll({
                    where: { userId: userId },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        {
                            model: User,
                            attributes: { include: ['username'] },
                        },
                        {
                            model: User,
                            as: 'usersliked',
                        }
                    ]
                });
                return userPosts;
            }
            else {
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
            }
        },
        singlePost: async (_root, args) => {
            const { id } = { ...args };
            console.log('singlepost');
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: { include: ['username'] },
                    },
                    {
                        model: Comment,
                    },
                ],
            });
            if (post) {
                return post;
            }
            else {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR'
                    }
                });
            }
        },
    },
    Mutation: {
        addPost: async (_root, args, { req }) => {
            const token = cookie.parse(req.headers.cookie).session;
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
            }
            else {
                throw new GraphQLError('Cannot validate the user', {
                    extensions: {
                        code: 'FORBIDDEN'
                    }
                });
            }
        },
        editLikes: async (_root, args, { req }) => {
            const token = cookie.parse(req.headers.cookie).session;
            if (!token) {
                throw new GraphQLError('Missing token', {
                    extensions: {
                        code: 'FORBIDDEN',
                        argumentName: args.type,
                    },
                });
            }
            const { id, type, userId } = { ...args };
            if (type === 'inc') {
                const likedPost = await LikedPost.findOne({ where: { userId: userId, postId: id } });
                console.log('liking the post', id, type, userId);
                console.log(likedPost);
                if (!likedPost) {
                    try {
                        const incrementResult = await Post.increment('likes', { by: 1, where: { id: id } });
                        console.log(incrementResult[0][1]);
                        console.log(incrementResult[0][0][0].title);
                        console.log({ ...incrementResult[0][0][0] });
                        if (Number(incrementResult[0][1]) === Number(1)) {
                            try {
                                await LikedPost.create({ userId: userId, postId: id });
                                return { type: 'inc', message: 'Successfully liked the post!', post: { ...incrementResult[0][0][0] } };
                            }
                            catch (error) {
                                console.log(error);
                                throw new GraphQLError('Error: failed to save to the database', {
                                    extensions: {
                                        argumentName: args.type,
                                    },
                                });
                            }
                        }
                        else {
                            throw new GraphQLError('Error: failed to like the post', {
                                extensions: {
                                    argumentName: args.type,
                                },
                            });
                        }
                    }
                    catch (e) {
                        throw new GraphQLError('Error: failed to like the post', {
                            extensions: {
                                argumentName: args.type,
                            },
                        });
                    }
                }
                else {
                    throw new GraphQLError('Already liked the post', {
                        extensions: {
                            argumentName: args.type,
                        },
                    });
                }
            }
            else if (type === 'dec') {
                console.log('dec');
                const likedPost = await LikedPost.findOne({ where: { userId: userId, postId: id } });
                console.log(likedPost);
                if (likedPost) {
                    try {
                        const decrementResult = await Post.decrement('likes', { by: 1, where: { id: id } });
                        console.log(decrementResult[0][1]);
                        if (Number(decrementResult[0][1]) === Number(1)) {
                            try {
                                await likedPost.destroy();
                                return { type: 'dec', message: 'You disliked the post...', post: { ...decrementResult[0][0][0] } };
                            }
                            catch (e) {
                                console.log(e);
                                throw new GraphQLError('Error: failed to save to the database', {
                                    extensions: {
                                        argumentName: args.type,
                                    },
                                });
                            }
                        }
                        else {
                            throw new GraphQLError('Error: failed to dislike the post', {
                                extensions: {
                                    argumentName: args.type,
                                },
                            });
                        }
                    }
                    catch (e) {
                        throw new GraphQLError('Error: failed to dislike the post', {
                            extensions: {
                                argumentName: args.type,
                            },
                        });
                    }
                }
                else {
                    throw new GraphQLError('Already disliked the post', {
                        extensions: {
                            argumentName: args.type,
                        },
                    });
                }
            }
            else {
                throw new GraphQLError('Something went wrong', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        argumentName: args.type,
                    },
                });
            }
        }
    },
};
