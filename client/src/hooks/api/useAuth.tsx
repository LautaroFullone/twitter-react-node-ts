import { useQuery } from '@tanstack/react-query'
import { authenticatedUser } from '../../services/authService'
import useUserStore from '../useUserStore'

export default function useAuth() {
   const { loginSuccess } = useUserStore()

   const { data, isError, error, isLoading } = useQuery({
      queryKey: ['auth-user'],
      queryFn: authenticatedUser,
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: loginSuccess,
   })

   return { currentUser: data, isError, error, isLoading }
}
