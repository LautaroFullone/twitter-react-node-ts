import { useMemo } from 'react'
import { Comment } from '../models/Post'
import { formatDistanceToNowStrict } from 'date-fns'
import { useAuthNavigation } from '../hooks'
import Avatar from './Avatar'

interface CommentItemProps {
   comment: Comment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
   const navigate = useAuthNavigation()

   const createdAt = useMemo(() => {
      if (!comment?.createdAt) return null

      return formatDistanceToNowStrict(new Date(comment.createdAt))
   }, [comment])

   return (
      <div
         className="p-5
            border-b-[1px]
            border-neutral-800
            cursor-pointer
            hover:bg-neutral-900
            transition"
      >
         <div className="flex flex-row items-start gap-3">
            <Avatar userId={comment.userId} imageSrc={comment.user?.profileImage as string} />
            <div>
               <div className="flex flex-row items-center gap-2">
                  <p
                     onClick={() => navigate(`/profile/${comment.userId}`)}
                     className="text-white
                     font-semibold
                     cursor-pointer
                     hover:underline"
                  >
                     {comment.user?.name}
                  </p>

                  <span
                     className="text-neutral-500
                     cursor-pointer
                     hover:underline
                     hidden
                     mb:block"
                  >
                     @{comment.user?.username}
                  </span>

                  <span className="text-neutral-500 text-sm">{createdAt}</span>
               </div>

               <div className="text-white mt-1">{comment.body}</div>
            </div>
         </div>
      </div>
   )
}

export default CommentItem
