import { PageHeader, PostsFeed, Spinner, UserBio, UserHero } from '../../components'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryUserById } from '../../hooks'

const PostDetailsPage = () => {
   const { postId } = useParams()
   const { user, isLoading, isError } = useQueryUserById(userId as string)

   if (isLoading) {
      return <Spinner />
   }

   if (isError) {
      return <Navigate to={'error'} />
   }

   if (user) {
      return (
         <>
            <PageHeader label={user.name} showBackArrow />

            <UserHero user={user} />
            <UserBio user={user} />

            <PostsFeed userId={userId as string} />
         </>
      )
   }
}

export default PostDetailsPage
