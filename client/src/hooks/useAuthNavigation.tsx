import { useNavigate } from 'react-router-dom'
import { useUserStore, useModalStore } from './stores'

const useAuthNavigation = () => {
   const { currentUser } = useUserStore()
   const { modalActions } = useModalStore()

   const navigate = useNavigate()

   const navigateAuth = (path: string, authRequired?: boolean) => {
      if (!currentUser && authRequired) {
         modalActions.openLoginModal()
      } else {
         navigate(path)
      }
   }

   return navigateAuth
}

export default useAuthNavigation
