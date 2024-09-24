import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface AvatarProps {
   userId: string
   isLarge?: boolean
   hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
   const navigate = useNavigate()
   const user = { profileImage: 'hola ' }
   //const { user } = useUser(userId)

   const onClick = useCallback(
      (evt: React.MouseEvent<HTMLImageElement>) => {
         evt.stopPropagation()
         navigate(`/pages/users/${userId}`)
      },
      [navigate, userId]
   )

   return (
      <div
         className={`
            rounded-full
            hover:opacity-90
            transition
            cursor-pointer
            relative
            ${hasBorder ? 'border-4 border-black' : ''} 
            ${isLarge ? 'h-32' : 'h-12'} 
            ${hasBorder ? 'w-32' : 'w-12'} 
      `}
      >
         <img
            alt="Avatar"
            onClick={onClick}
            src={user?.profileImage || '/images/user-placeholder.jpg'}
            onError={(e) => {
               e.currentTarget.src = '/images/user-placeholder.jpg'
            }}
            className="object-cover rounded-full h-full"
         />
      </div>
   )
}

export default Avatar
