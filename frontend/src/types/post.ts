interface User {
  username: string
  name?: string
}

export interface PostType {
  id: number
  content: string
  title: string
  user: User
}

export interface PostProps {
  post: PostType
}