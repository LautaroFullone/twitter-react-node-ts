import { useCallback } from 'react'
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'
import { useModalStore, useUserStore } from '../hooks'

interface SidebarItemProps {
   label: string
   icon: IconType
   href?: string
   onClick?: () => void
   authRequired?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({
   label,
   icon: Icon,
   href,
   onClick,
   authRequired = false,
}) => {
   const { openLoginModal } = useModalStore()
   const navigate = useNavigate()

   const { currentUser } = useUserStore()

   const handleClick = useCallback(() => {
      if (authRequired && !currentUser) return openLoginModal() //TODO: si pongo return corta, si no lo pongo y se tiene que logguear el flujo dsp sigue?

      if (onClick) {
         return onClick()
      } else if (href) {
         return navigate(href)
      }
   }, [authRequired, currentUser, openLoginModal, onClick, href, navigate])

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
         </div>
      </div>
   )
}

export default SidebarItem
