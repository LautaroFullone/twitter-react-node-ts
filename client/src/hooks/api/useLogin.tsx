import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '../stores'
import { login } from '../../services'
import toast from 'react-hot-toast'
import useToken from '../useToken'

const useLogin = () => {
   const { userActions } = useUserStore()
   const { setToken } = useToken()

   const { mutateAsync: loginUser } = useMutation({
      mutationFn: login,
      onSuccess: (data) => {
         userActions.dispatchCurrentUser(data.user)
         setToken(data.token)
         toast.success(data.message)
      },
      onError: (error) => {
         toast.error(error.message || 'Login Error')
      },
   })

   return { loginUser }
}

export default useLogin
