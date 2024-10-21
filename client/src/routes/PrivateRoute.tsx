import { Outlet, Navigate } from 'react-router-dom'
import { useUserStore } from '../hooks'

const PrivateRoute = () => {
   const { currentUser } = useUserStore()

   return currentUser ? <Outlet /> : <Navigate to="/" replace />
}

export default PrivateRoute
