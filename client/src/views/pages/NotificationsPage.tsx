import { PageHeader } from '../../components'
import useAuth from '../../hooks/api/useAuth'

const NotificationsPage = () => {
   const { currentUser, error } = useAuth()

   console.log('# noti user ', currentUser, ' error: ', error)
   return (
      <>
         <PageHeader label="Notifications" />
         <p className="text-white">Notificaciones de {currentUser?.name}</p>
      </>
   )
}

export default NotificationsPage
