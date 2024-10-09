import { User } from '../models'
import Avatar from './Avatar'

interface UserHeroProps {
   user: User
}

const UserHero: React.FC<UserHeroProps> = ({ user }) => {
   return (
      <div>
         <div className="bg-neutral-700 h-44 relative ">
            {user.coverImage && (
               <img
                  src={user?.coverImage}
                  className="object-cover w-full h-full"
                  alt="User profile image"
               />
            )}
            <div className="absolute -bottom-16 left-4">
               <Avatar userId={user.id} imageSrc={user.profileImage} isLarge hasBorder />
            </div>
         </div>
      </div>
   )
}

export default UserHero
