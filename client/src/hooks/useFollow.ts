import { useMemo } from 'react'
import { User } from '../models'
import { useUserStore } from './stores'
import useMutationFollowers from './api/useMutationFollowers'

const useFollow = (userId: User['id']) => {
   const { currentUser } = useUserStore()

   const isCurrentUserFollowing = useMemo(() => {
      const usersFollowByCurrent = currentUser?.followingIds || []

      return usersFollowByCurrent.includes(userId)
   }, [currentUser?.followingIds, userId])

   const { toggleFollowing, isLoading } = useMutationFollowers(
      isCurrentUserFollowing ? 'unfollow' : 'follow'
   )

   const toggleFollow = async () => {
      await toggleFollowing(userId)
   }

   return { toggleFollow, isFollowing: isCurrentUserFollowing, isLoading }
}

export default useFollow
