import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../services'
import { User } from '../../models'
import { useUserStore } from '../stores'

const useQueryUserById = (id: User['id']) => {
   const { currentUser } = useUserStore()

   const { data, isError, isLoading } = useQuery({
      queryKey: ['get-user', id],
      queryFn: () => getUserById(id),
      staleTime: 20 * 60 * 1000, //20min
      enabled: id !== currentUser?.id,
      retry: 1,
   })

   return {
      user: id !== currentUser?.id ? data?.user : currentUser,
      isError,
      isLoading,
   }
}

export default useQueryUserById
