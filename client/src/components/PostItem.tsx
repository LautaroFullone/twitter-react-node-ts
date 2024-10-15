import { useNavigate } from 'react-router-dom'
import { Post } from '../models'
import { useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import Avatar from './Avatar'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import PostItemCounter from './PostItemCounter'

interface PostItemProps {
   data: Post
}

const PostItem: React.FC<PostItemProps> = ({ data }) => {
   const navigate = useNavigate()

   const handleLike = () => {
      console.log('# like')
   }

   const createdAt = useMemo(() => {
      if (!data?.createdAt) return null

      return formatDistanceToNowStrict(new Date(data.createdAt))
   }, [data])

   return (
      <div
         className="border-b-[1px] 
            border-neutral-800 
            p-5 
            hover:bg-neutral-900 
            transition"
      >
         <div className="flex flex-row items-start gap-3">
            <Avatar userId={data.userId} imageSrc={data.user.profileImage} />
            <div>
               <div className="flex flex-row items-center gap-2">
                  <p
                     onClick={() => navigate(`/profile/${data.userId}`)}
                     className="text-white 
                        cursor-pointer 
                        hover:underline 
                        font-semibold "
                  >
                     @{data.user.name}
                  </p>

                  <span
                     className="text-neutral-500 
                        cursor-pointer 
                        hover:underline 
                        hidden 
                        md:block"
                  >
                     @{data.user.username}
                  </span>

                  <span className="text-neutral-500 text-sm">{createdAt}</span>
               </div>

               <div className="text-white mt-1">{data.body}</div>

               <div className="flex flex-row items-center mt-3 gap-10">
                  <PostItemCounter
                     icon={AiOutlineMessage}
                     value={data.comments.length || 0}
                     hoverColor="sky"
                  />

                  <PostItemCounter
                     icon={AiOutlineHeart}
                     value={data.comments.length || 0}
                     hoverColor="red"
                     onClick={handleLike}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default PostItem
