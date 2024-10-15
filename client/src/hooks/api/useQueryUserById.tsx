import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../services'
import { User } from '../../models'

const useQueryUserById = (id: User['id']) => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ['getUserById', id],
      queryFn: () => getUserById(id),
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   return {
      user: data?.user,
      isError,
      isLoading,
   }
}

export default useQueryUserById
