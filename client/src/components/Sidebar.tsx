import { FaUser } from 'react-icons/fa'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import { SidebarAction } from '../models/Sidebar'
import { useUserStore } from '../hooks'

const Sidebar = () => {
   const navigate = useNavigate()
   const { currentUser, dispatchCurrentUser } = useUserStore()

   const itemActions: SidebarAction[] = [
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
      },
      {
         label: 'Profile',
         href: `/profile/${currentUser?.id}`,
         icon: FaUser,
         authRequired: true,
      },
   ]

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
                  <SidebarItem
                     key={item.href}
                     href={item.href}
                     label={item.label}
                     icon={item.icon}
                     authRequired={item.authRequired}
                  />
               ))}
               {currentUser && (
                  <SidebarItem
                     onClick={() => {
                        sessionStorage.removeItem('token')
                        dispatchCurrentUser(null)
                     }}
                     label="Logout"
                     icon={BiLogOut}
                  />
               )}
               <SidebarTweetButton />
            </div>
         </div>
      </div>
   )
}

export default Sidebar
