import { IconType } from 'react-icons'

interface PostItemCounterProps {
   value: number
   icon: IconType
   color: 'red' | 'sky'
   isActive?: boolean
   onClick?: () => void
}

const PostItemCounter: React.FC<PostItemCounterProps> = ({
   icon: Icon,
   onClick,
   value,
   color,
   isActive,
}) => {
   return (
      <div
         onClick={onClick}
         className={`flex 
            flex-row 
            items-center 
            text-neutral-500 
            gap-2 
            cursor-pointer 
            transition 
            hover:text-${color}-500
            ${isActive ? `text-${color}-500` : ''}
         `}
      >
         <Icon size={20} />
         <p>{value}</p>
      </div>
   )
}

export default PostItemCounter
