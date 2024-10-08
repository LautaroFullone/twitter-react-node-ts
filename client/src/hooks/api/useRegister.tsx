import { useMutation } from '@tanstack/react-query'
import { login } from '../../services'
import toast from 'react-hot-toast'

const useRegister = () => {
   const { mutateAsync: registerUser } = useMutation({
      mutationFn: login,
      onSuccess: (data) => {
         toast.success(data.message)
      },
      onError: (error) => {
         toast.error(error.message || 'Register Error')
      },
   })

   return { registerUser }
}

export default useRegister
