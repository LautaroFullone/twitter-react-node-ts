import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../services'

const useQueryUsers = () => {
   const { data, error, isLoading } = useQuery({
      queryKey: ['get-users'],
      queryFn: getUsers,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   return {
      users: data,
      error,
      isLoading,
   }
}

export default useQueryUsers
