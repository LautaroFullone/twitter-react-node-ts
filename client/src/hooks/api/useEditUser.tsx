import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editUser } from '../../services'

const useEditUser = () => {
   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: editUser,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['auth-user'] })
         console.log('Usuario actualizado con éxito')
      },
      onError: (error) => {
         console.error('Error al actualizar el usuario:', error)
      },
   })

   return mutation
}

export default useEditUser
