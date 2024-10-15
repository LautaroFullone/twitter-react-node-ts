import { User } from './User'

interface Comment {
   id: string
   body: string
   createdAt: string
   updatedAt: string
   userId: string
   postId: string
}

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
