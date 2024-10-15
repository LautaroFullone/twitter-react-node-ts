import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editUser } from '../../services'
import { useUserStore } from '../stores'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useMutationEditUser = () => {
   const { userActions } = useUserStore()
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: editCurrentUser } = useMutation({
      mutationFn: editUser,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         userActions.dispatchCurrentUser(data.user)
         queryClient.invalidateQueries({ queryKey: ['get-user'] })
      },
      onError: (error) => {
         toast.error(error.message || 'Edit user Error')
      },
   })

   return { editCurrentUser, isLoading }
}

export default useMutationEditUser
