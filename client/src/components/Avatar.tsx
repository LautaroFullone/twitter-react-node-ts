import { useNavigate } from 'react-router-dom'

interface AvatarProps {
   userId: string
   isLarge?: boolean
   hasBorder?: boolean
   imageSrc: string
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder, imageSrc }) => {
   const navigate = useNavigate()

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
            onClick={() => navigate(`/profile/${userId}`)}
            src={imageSrc || '/images/user-placeholder.jpg'}
            onError={(e) => {
               e.currentTarget.src = '/images/user-placeholder.jpg'
            }}
            className="object-cover rounded-full h-full"
         />
      </div>
   )
}

export default Avatar
