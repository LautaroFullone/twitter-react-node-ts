import { useNavigate } from 'react-router-dom'
import { Post } from '../models'
import { useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import Avatar from './Avatar'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import PostItemCounter from './PostItemCounter'
import useLike from '../hooks/useLike'
import { useModalStore, useUserStore } from '../hooks'

interface PostItemProps {
   post: Post
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
   const { toggleLike, hasLike } = useLike(post)
   const { modalActions } = useModalStore()
   const { currentUser } = useUserStore()

   const navigate = useNavigate()

   const handleLike = async () => {
      if (!currentUser) {
         return modalActions.openLoginModal()
      }
      await toggleLike()
   }

   const createdAt = useMemo(() => {
      if (!post?.createdAt) return null

      return formatDistanceToNowStrict(new Date(post.createdAt))
   }, [post])

   return (
      <div
         className="border-b-[1px] 
            border-neutral-800 
            p-5 
            hover:bg-neutral-900 
            transition"
      >
         <div className="flex flex-row items-start gap-3">
            <Avatar userId={post.userId} imageSrc={post.user.profileImage} />
            <div>
               <div className="flex flex-row items-center gap-2">
                  <p
                     onClick={() => navigate(`/profile/${post.userId}`)}
                     className="text-white 
                        cursor-pointer 
                        hover:underline 
                        font-semibold "
                  >
                     @{post.user.name}
                  </p>

                  <span
                     className="text-neutral-500 
                        cursor-pointer 
                        hover:underline 
                        hidden 
                        md:block"
                  >
                     @{post.user.username}
                  </span>

                  <span className="text-neutral-500 text-sm">{createdAt}</span>
               </div>

               <div className="text-white mt-1">{post.body}</div>

               <div className="flex flex-row items-center mt-3 gap-10">
                  <PostItemCounter
                     icon={AiOutlineMessage}
                     value={post.comments.length || 0}
                     color="sky"
                  />

                  <PostItemCounter
                     icon={AiOutlineHeart}
                     value={post.likedIds.length || 0}
                     color="red"
                     onClick={handleLike}
                     isActive={hasLike}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default PostItem
