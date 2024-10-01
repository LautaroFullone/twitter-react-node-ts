import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services'
import Avatar from './Avatar'

const FollowBar = () => {
   const { data, isLoading } = useQuery({
      queryKey: ['getUsers'],
      queryFn: getUsers,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isLoading) {
      return <div className="text-white">Loading....</div>
   }

   if (data?.users) {
      return (
         <div className="hidden px-6 pt-4 lg:block">
            <div className="bg-neutral-800 rounded-xl p-4">
               <h2 className="text-white text-xl font-semibold"> Who To Follow</h2>
               <div className="flex flex-col gap-6 mt-4">
                  {data.users.map((user) => (
                     <div key={user.id} className="flex flex-row gap-4">
                        <Avatar userId={user.id} imageSrc={user.image} />
                        <div className="flex flex-col justify-center">
                           <p
                              className="text-white 
                              font-semibold 
                              text-sm"
                           >
                              {user.name}
                           </p>
                           <p className="text-neutral-400 text-sm">@{user.username}</p>
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
