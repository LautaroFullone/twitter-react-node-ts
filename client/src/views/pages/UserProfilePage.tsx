import { PageHeader, UserBio, UserHero } from '../../components'
import { Navigate, useParams } from 'react-router-dom'
import { useGetUserById } from '../../hooks'
import { ClipLoader } from 'react-spinners'

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
