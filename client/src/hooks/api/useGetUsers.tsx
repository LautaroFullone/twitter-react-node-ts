import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../services'

const useGetUsers = () => {
   const { data, error, isLoading } = useQuery({
      queryKey: ['getUsers'],
      queryFn: getUsers,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   return {
      data,
      error,
      isLoading,
   }
}

export default useGetUsers
