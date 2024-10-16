import { useMutation, useQueryClient } from '@tanstack/react-query'
import { dislikePost, likePost } from '../../services'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useMutationLikes = (action: 'like' | 'dislike') => {
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: toggleLiked } = useMutation({
      mutationFn: action === 'like' ? likePost : dislikePost,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.invalidateQueries({ queryKey: ['get-all-posts'] })
         queryClient.invalidateQueries({ queryKey: ['get-user-posts', data.post.userId] })
      },
      onError: (error) => {
         toast.error(error.message || 'Like error')
      },
   })

   return { toggleLiked, isLoading }
}

export default useMutationLikes
