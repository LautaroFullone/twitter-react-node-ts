import { User } from '../models/User'
import Avatar from './Avatar'

const FollowBar = () => {
   const users: User[] = []

   if (users.length > 0) {
      return (
         <div className="hidden px-6 pt-4 lg:block">
            <div className="bg-neutral-800 rounded-xl p-4">
               <h2 className="text-white text-xl font-semibold">
                  {' '}
                  Who To Follow
               </h2>
               <div className="flex flex-col gap-6 mt-4">
                  {users.map((user) => (
                     <div key={user.id} className="flex flex-row gap-4">
                        <Avatar userId={user.id} />
                        <div className="flex flex-col">
                           <p
                              className="text-white 
                              font-semibold 
                              text-sm"
                           >
                              {user.name}
                           </p>
                           <p className="text-neutral-400 text-sm">
                              @{user.username}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )
   }
}

export default FollowBar
