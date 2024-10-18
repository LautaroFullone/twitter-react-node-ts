import { IconType } from 'react-icons'

export interface SidebarAction {
   label: string
   icon: IconType
   href?: string
   onClick?: () => void
   authRequired?: boolean
   alert?: boolean
}
