import { useMutation } from '@tanstack/react-query'
import { createPost } from '../../services'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useMutationPost = () => {
   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: createNewPost } = useMutation({
      mutationFn: createPost,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
      },
      onError: (error) => {
         toast.error(error.message || 'Create post error')
      },
   })

   return { createNewPost, isLoading }
}

export default useMutationPost
