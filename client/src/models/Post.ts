import { User } from './User'

export interface Comment {
   id: string
   body: string
   createdAt: string
   updatedAt: string
   userId: string
   postId: string
}

export type CreateCommentForm = Pick<Comment, 'body'>

export interface Post {
   id: string
   body: string
   userId: string
   user: User
   likedIds: string[]
   createdAt: string
   updatedAt: string
   comments: Comment[]
}

export type CreatePostForm = Pick<Post, 'body'>
