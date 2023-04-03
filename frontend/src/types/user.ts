import { LikedPosts, PostType } from './post';

export interface UserSignIn {
  username: string
  password: string
}

export interface EditProfile {
  bio?: string
  username: string
}

interface LikedPost {
  postId: number
  userId: number
  __typename: string
}

export interface UserProfileType {
  bio?: string
  createdAt?: string
  id: string
  name: string
  username: string
  __typename: string
  userLikedPosts: [LikedPosts]
  posts: [PostType]
  likedPosts: [LikedPost]
}

export interface SingleUser {
  singleUser: UserProfileType
}

export interface EditUserProfile {
  editProfile: UserProfileType
}