export interface LikedPosts {
  userId: number
  postId: number
}

export interface UserType {
  username: string
  name?: string
  id: number
  likedPosts: [LikedPosts]
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
}

export interface PostProps {
  post: PostType
  user: UserType
}