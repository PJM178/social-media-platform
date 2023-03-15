interface User {
  username: string
  name?: string
}

export interface PostType {
  id: number
  content: string
  title: string
  likes: number
  user: User
}

export interface PostProps {
  post: PostType
}