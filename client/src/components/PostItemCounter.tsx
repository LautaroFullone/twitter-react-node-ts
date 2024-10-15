import { IconType } from 'react-icons'

interface PostItemCounterProps {
   value: number
   icon: IconType
   hoverColor: 'red' | 'sky'
   onClick?: () => void
}

const PostItemCounter: React.FC<PostItemCounterProps> = ({
   icon: Icon,
   onClick,
   value,
   hoverColor,
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
            ${hoverColor === 'red' ? 'hover:text-red-500' : ''}
            ${hoverColor === 'sky' ? 'hover:text-sky-500' : ''}
         `}
      >
         <Icon size={20} />
         <p>{value}</p>
      </div>
   )
}

export default PostItemCounter
