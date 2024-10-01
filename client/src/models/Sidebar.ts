import { IconType } from 'react-icons'

export interface SidebarAction {
   label: string
   href: string
   icon: IconType
   authRequired?: boolean
}
