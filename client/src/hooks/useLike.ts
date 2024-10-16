import { useMemo } from 'react'
import { Post } from '../models'
import { useUserStore } from './stores'
import useMutationLikes from './api/useMutationLikes'

const useLike = (post: Post) => {
   const { currentUser } = useUserStore()

   const hasCurrentUserLike = useMemo(() => {
      const postLikes = post.likedIds || []

      return currentUser ? postLikes.includes(currentUser.id) : false
   }, [currentUser, post.likedIds])

   const { toggleLiked, isLoading } = useMutationLikes(hasCurrentUserLike ? 'dislike' : 'like')

   const toggleLike = async () => {
      await toggleLiked(post.id)
   }

   return { toggleLike, hasLike: hasCurrentUserLike, isLoading }
}

export default useLike
