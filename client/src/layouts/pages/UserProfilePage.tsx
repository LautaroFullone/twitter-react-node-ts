import { PageHeader, PostsFeed, UserBio, UserHero } from '../../components'
import { Navigate, useParams } from 'react-router-dom'
import { useQueryUserById } from '../../hooks'
import { ClipLoader } from 'react-spinners'

const UserProfilePage = () => {
   const { userId } = useParams()
   const { user, isLoading, isError } = useQueryUserById(userId as string)

   if (isLoading) {
      return (
         <div
            className="flex
               justify-center
               items-center
               h-full"
         >
            <ClipLoader color="lightblue" size={80} />
         </div>
      )
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

export default UserProfilePage
