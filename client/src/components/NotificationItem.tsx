import { BsTwitter } from 'react-icons/bs'
import { Notification } from '../models'

interface NotificationItemProps {
   notification: Notification
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
   return (
      <div
         className="flex
            flex-row
            items-center
            P-6
            gap-4
            border-b-[1px]
          border-neutral-800"
      >
         <BsTwitter color="white" size={32} />
         <p className="text-white">{notification.body}</p>
      </div>
   )
}

export default NotificationItem
