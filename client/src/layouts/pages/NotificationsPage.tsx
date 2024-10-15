import { PageHeader } from '../../components'
import { useUserStore } from '../../hooks'

const NotificationsPage = () => {
   const { currentUser } = useUserStore()

   return (
      <>
         <PageHeader label="Notifications" />
         <p className="text-white">Notificaciones de {currentUser?.name}</p>
      </>
   )
}

export default NotificationsPage
