import { useMemo } from 'react'
import { User } from '../models'
import { format } from 'date-fns'
import Button from './Button'
import { BiCalendar } from 'react-icons/bi'
import { useAuth, useModalStore } from '../hooks'

interface UserBioProps {
   user: User & { followersCount: number }
}

const UserBio: React.FC<UserBioProps> = ({ user }) => {
   const { currentUser } = useAuth()
   const { modalActions } = useModalStore()

   const createdAt = useMemo(() => {
      if (!user?.createdAt) return null

      return format(new Date(user.createdAt), 'MMMM yyyy')
   }, [user])

   return (
      <div className="border-b-[1px] border-neutral-800 pb-4">
         <div className="flex justify-end p-2">
            {currentUser?.id === user.id ? (
               <Button label="Edit" secondary onClick={() => modalActions.openEditModal()} />
            ) : (
               <Button
                  label="Follow"
                  secondary
                  onClick={() => {
                     if (!currentUser) return modalActions.openLoginModal()
                  }}
               />
            )}
         </div>

         <div className="mt-8 px-4">
            <div className="flex flex-col">
               <p className="text-white text-2xl font-semibold">{user.name}</p>
               <p className="text-md text-neutral-500">@{user.username}</p>
            </div>

            <div className="flex flex-col mt-4">
               <p className="text-white">{user.bio}</p>
            </div>

            <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
               <BiCalendar size={24} />
               <p>Joined in {createdAt}</p>
            </div>

            <div className="flex flex-row items-center mt-4 gap-6">
               <div className="flex flex-row items-center gap-1">
                  <p className="text-white">{user.followingIds.length}</p>
                  <p className="text-neutral-500">Following</p>
               </div>
               <div className="flex flex-row items-center gap-1">
                  <p className="text-white">{user.followersCount || 0}</p>
                  <p className="text-neutral-500">Following</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UserBio
