import { Navigate, useParams } from 'react-router-dom'
import { PageHeader, UserBio, UserHero } from '../../components'
import { ClipLoader } from 'react-spinners'
import { useGetUserById } from '../../hooks'

const UserProfilePage = () => {
   const { userId } = useParams()
   const { data, isLoading, isError } = useGetUserById(userId as string)

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

   if (data?.user) {
      return (
         <>
            <PageHeader label={data.user.name} showBackArrow />
            <UserHero user={data.user} />
            <UserBio user={data.user} />
         </>
      )
   }
}

export default UserProfilePage
