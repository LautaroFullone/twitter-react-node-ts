interface Comment {
   id: string
   body: string
   createdAt: string
   updatedAt: string
   userId: string
   postId: string
}

export interface Posts {
   id: string
   body: string
   userId: string
   likedIds: string[]
   createdAt: string
   updatedAt: string
   comments: Comment[]
}
