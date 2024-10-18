import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { useQueryClient } from '@tanstack/react-query'
import SidebarTweetButton from './SidebarTweetButton'
import { SidebarAction } from '../models/Sidebar'
import { useUserStore, useToken } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import SidebarItem from './SidebarItem'
import { useMemo } from 'react'

const Sidebar = () => {
   const navigate = useNavigate()
   const { currentUser, userActions } = useUserStore()
   const { removeToken } = useToken()
   const queryClient = useQueryClient()

   const itemActions: SidebarAction[] = useMemo(
      () => [
         {
            label: 'Home',
            href: '/',
            icon: BsHouseFill,
         },
         {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            authRequired: true,
            alert: currentUser?.hasNotification, //TODO: no muestra alert cuando hay notificaciones
         },
         {
            label: 'Profile',
            href: `/profile/${currentUser?.id}`,
            icon: FaUser,
            authRequired: true,
         },
      ],
      [currentUser]
   )

   const handleLogout = () => {
      removeToken()
      userActions.dispatchCurrentUser(null)
      queryClient.invalidateQueries({ queryKey: ['auth-user'] })
      navigate('/')
   }

   return (
      <div className="col-span-1 h-full pr-4 md:pr-6">
         <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[230px]">
               <div
                  onClick={() => navigate('/')}
                  className="rounded-full 
                     h-14 
                     w-14 
                     p-4 
                     flex 
                     items-center 
                     justify-center 
                     hover:bg-blue-300 
                     hover: bg-opacity-10 
                     cursor-pointer 
                     transition"
               >
                  SidebarLogo
               </div>

               {itemActions.map((item) => (
                  <SidebarItem key={item.href} {...item} />
               ))}

               {currentUser && (
                  <SidebarItem onClick={handleLogout} label="Logout" icon={BiLogOut} />
               )}
               <SidebarTweetButton />
            </div>
         </div>
      </div>
   )
}

export default Sidebar
