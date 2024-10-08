import { authenticatedUser } from '../../services'
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '../stores'
import useToken from '../useToken'

// Si no tenemos instancia de usuario logueado
// y habia un token seteado
// y la api nos devolvio correctamente el usuario conectado
const useGetCurrentUser = () => {
   const { currentUser } = useUserStore()
   const { getToken } = useToken()

   // si no hay instancia de currentUser pero si token
   // SOLO cuando el usuario esta logueado y recarga la pagina
   const isEnabled = () => {
      const token = getToken()
      return !currentUser && token != null
   }

   const { data, isError, error, isLoading } = useQuery({
      queryKey: ['auth-user'],
      queryFn: authenticatedUser,
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: isEnabled(),
   })

   return { currentUserApi: data, isError, error, isLoading }
}

export default useGetCurrentUser
