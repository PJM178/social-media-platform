interface User {
  username: string
  __typename: string
}

export interface Comment {
  id: string
  userId: number
  postId: number
  comment: string
  createdAt: string
  updatedAt: string
  user: User
}