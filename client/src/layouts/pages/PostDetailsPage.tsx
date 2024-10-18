import { CommentItem, Form, PageHeader, PostItem, Spinner } from '../../components'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryPostById } from '../../hooks'

const PostDetailsPage = () => {
   const { postId } = useParams()
   const { post, isLoading, isError } = useQueryPostById(postId as string)

   if (isLoading) {
      return <Spinner />
   }

   if (isError) {
      return <Navigate to={'/error'} />
   }

   if (post) {
      return (
         <>
            <PageHeader label="hola" showBackArrow />

            <PostItem key={post.id} post={post} />

            <Form placeholder="Tweet your reply" postId={postId as string} isComment />

            {post.comments.map((comment) => (
               <CommentItem key={comment.id} comment={comment} />
            ))}
         </>
      )
   }
}

export default PostDetailsPage
