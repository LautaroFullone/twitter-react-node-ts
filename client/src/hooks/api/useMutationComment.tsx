import { useMutation } from '@tanstack/react-query'
import { commentPost } from '../../services'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useMutationComment = () => {
   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: comment } = useMutation({
      mutationFn: commentPost,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
      },
      onError: (error) => {
         toast.error(error.message || 'Create comment error')
      },
   })

   return { comment, isLoading }
}

export default useMutationComment
