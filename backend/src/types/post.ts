export interface PostEntry {
  id: string
  userId: number
  content: string
  title: string
  likes?: number
}

export interface LikedPost {
  postId: number
  userId: number
}

export interface CommentEntry {
  userId: number
  postId: number
  comment: string
}