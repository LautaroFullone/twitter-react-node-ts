import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '../stores'
import { login } from '../../services'
import toast from 'react-hot-toast'
import useToken from '../useToken'
import { useState } from 'react'

const useMutationLogin = () => {
   const [isLoading, setIsLoading] = useState(false)
   const { userActions } = useUserStore()
   const { setToken } = useToken()

   const { mutateAsync: loginUser } = useMutation({
      mutationFn: login,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         userActions.dispatchCurrentUser(data.user)
         setToken(data.token)
         toast.success(data.message)
      },
      onError: (error) => {
         toast.error(error.message || 'Login error')
      },
   })

   return { loginUser, isLoading }
}

export default useMutationLogin
