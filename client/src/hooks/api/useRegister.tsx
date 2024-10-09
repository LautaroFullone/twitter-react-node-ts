import { useMutation } from '@tanstack/react-query'
import { register } from '../../services'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useRegister = () => {
   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: registerUser } = useMutation({
      mutationFn: register,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
      },
      onError: (error) => {
         toast.error(error.message || 'Register Error')
      },
   })

   return { registerUser, isLoading }
}

export default useRegister
