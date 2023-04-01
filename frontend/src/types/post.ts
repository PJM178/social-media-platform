import { Comment } from './comment';

export interface LikedPosts {
  id: number
  content: string
  title: string
  likes: number
  user: UserType
  __typename: string
}

export interface UserType {
  username: string
  name?: string
  id: number
  likedPosts: [PostType]
  __typename: string
}

export interface UserProps {
  user: UserType
}

export interface PostType {
  id: number
  content: string
  title: string
  likes: number
  user: UserType
  __typename: string
}

export interface PostProps {
  post: PostType
  delay?: boolean
}

export interface SinglePost {
  id: number
  content: string
  title: string
  likes: number
  user: UserType
  __typename: string
  comments: [Comment]
}

export interface SinglePostType {
  singlePost: SinglePost
}