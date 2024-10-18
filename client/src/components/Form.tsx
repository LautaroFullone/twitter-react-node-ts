import { useQueryClient } from '@tanstack/react-query'
import {
   useBasicForm,
   useModalStore,
   useMutationComment,
   useMutationPost,
   useUserStore,
} from '../hooks'
import { CreatePostForm } from '../models'
import Avatar from './Avatar'
import Button from './Button'

interface FormProps {
   placeholder: string
   isComment?: boolean
   postId?: string
}

const initialFormData: CreatePostForm = {
   body: '',
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
   const { formData, handleChange, resetForm } = useBasicForm(initialFormData)
   const { modalActions } = useModalStore()
   const { currentUser } = useUserStore()
   const queryClient = useQueryClient()

   const { createNewPost, isLoading: isPostLoading } = useMutationPost()
   const { comment, isLoading: isCommentLoading } = useMutationComment()

   async function handleTweet() {
      if (isComment && postId) {
         await comment({ postId, commentBody: { body: formData.body } })
         queryClient.invalidateQueries({ queryKey: ['get-post', postId] })
      } else {
         await createNewPost(formData)
      }

      resetForm()
      queryClient.invalidateQueries({ queryKey: ['get-all-posts'] })
      queryClient.invalidateQueries({ queryKey: ['get-user-posts', currentUser?.id] })
   }

   return (
      <div className="border-b-[1px] border-neutral-800 px-5 py-2">
         {currentUser ? (
            <div className="flex flex-row gap-4">
               <div>
                  <Avatar userId={currentUser.id} imageSrc={currentUser.profileImage} />
               </div>

               <div className="w-full">
                  <textarea
                     name="body"
                     value={formData.body}
                     disabled={isCommentLoading || isPostLoading}
                     onChange={handleChange}
                     className="peer
                           resize-none
                           mt-3
                           w-full
                           bg-black
                           ring-0
                           outline-none
                           text-[20px]
                           placeholder-neutral-500
                           text-white
                           disabled:opacity-80"
                     placeholder={placeholder}
                  ></textarea>

                  <hr
                     className="opacity-0
                        peer-focus:opacity-100
                        h-[1px]
                        w-full
                        border-neutral-800
                        transition"
                  />

                  <div className="mt-4 flex flex-row justify-end">
                     <Button
                        label="Tweet"
                        onClick={handleTweet}
                        disabled={isCommentLoading || isPostLoading || !formData.body}
                     />
                  </div>
               </div>
            </div>
         ) : (
            <div className="py-8">
               <h1 className="text-white text-2xl text-center mb-4 font-bold">
                  Welcome to Twitter
               </h1>

               <div className="flex flex-row items-center justify-center gap-4">
                  <Button label="Login" onClick={modalActions.openLoginModal} />
                  <Button label="Register" secondary onClick={modalActions.openRegisterModal} />
               </div>
            </div>
         )}
      </div>
   )
}

export default Form
