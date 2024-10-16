import { useMutation, useQueryClient } from '@tanstack/react-query'
import { followUser, unfollowUser } from '../../services'
import { useUserStore } from '../stores'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useMutationFollowers = (action: 'follow' | 'unfollow') => {
   const { userActions } = useUserStore()
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: toggleFollowing } = useMutation({
      mutationFn: action === 'follow' ? followUser : unfollowUser,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         userActions.dispatchCurrentUser(data.user)
         queryClient.invalidateQueries({ queryKey: ['get-user', data.idUserProfile] })
         queryClient.invalidateQueries({ queryKey: ['get-user', data.user.id] })
      },
      onError: (error) => {
         toast.error(error.message || 'Follower error')
      },
   })

   return { toggleFollowing, isLoading }
}

export default useMutationFollowers
