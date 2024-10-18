import { NotificationItem, PageHeader, Spinner } from '../../components'
import { useQueryNotifications, useUserStore } from '../../hooks'
import { Navigate } from 'react-router-dom'

const NotificationsPage = () => {
   const { currentUser } = useUserStore()
   const { notifications, isLoading, isError } = useQueryNotifications(currentUser?.id as string)

   if (isLoading) {
      return <Spinner />
   }

   if (isError) {
      return <Navigate to={'/error'} />
   }

   if (notifications) {
      return (
         <>
            <PageHeader label="Notifications" />

            {notifications.length === 0 ? (
               <div
                  className="text-neutral-600
               text-center
               p-6
               text-xl"
               >
                  No notifications
               </div>
            ) : (
               <div className="flex flex-col">
                  {notifications.map((notification) => (
                     <NotificationItem key={notification.id} notification={notification} />
                  ))}
               </div>
            )}
         </>
      )
   }
}

export default NotificationsPage
