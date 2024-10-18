import { BsDot } from 'react-icons/bs'
import { useUserStore, useModalStore, useAuthNavigation } from '../hooks'
import { SidebarAction } from '../models/Sidebar'
import { useCallback } from 'react'

const SidebarItem: React.FC<SidebarAction> = ({
   label,
   icon: Icon,
   href,
   onClick,
   authRequired = false,
   alert,
}) => {
   const { modalActions } = useModalStore()
   const navigate = useAuthNavigation()

   const { currentUser } = useUserStore()

   const handleClick = useCallback(() => {
      if (authRequired && !currentUser) {
         return modalActions.openLoginModal()
      }

      if (onClick) {
         return onClick()
      } else if (href) {
         return navigate(href)
      }
   }, [authRequired, currentUser, onClick, href, modalActions, navigate])

   return (
      <div onClick={handleClick} className="flex flex-row items-center">
         <div
            className="relative 
               rounded-full 
               h-14 w-14 
               flex 
               items-center 
               justify-center 
               p-4 
               hover:bg-slate-300 
               hover:bg-opacity-10 
               cursor-pointer 
               lg:hidden"
         >
            <Icon size={28} color="white" />
            {alert && <BsDot className="text-sky-500 absolute -top-4 left-4" size={60} />}
         </div>

         <div
            className="relative
               hidden
               lg:flex
               items-center
               gap-4
               p-4
               rounded-full
               hover:bg-slate-300
               hover:bg-opacity-10
               cursor-pointer"
         >
            <Icon size={24} color="white" />
            <p className="hidden lg:block text-white text-xl">{label}</p>
            {alert && <BsDot className="text-sky-500 absolute -top-4 left-4" size={60} />}
         </div>
      </div>
   )
}

export default SidebarItem
