import { useQuery } from '@tanstack/react-query'
import { User } from '../../models'
import { getUserNotifications } from '../../services'

const useQueryNotifications = (userId: User['id']) => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ['get-user-notifications', userId],
      queryFn: () => getUserNotifications(userId),
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   return {
      notifications: data?.notifications,
      isError,
      isLoading,
   }
}

export default useQueryNotifications
