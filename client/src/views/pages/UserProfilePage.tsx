import { useParams } from 'react-router-dom'

const UserProfilePage = () => {
   const { userId } = useParams()
   console.log('userId:', userId)
   return <div className="text-3xl text-white">UserProfilePage</div>
}

export default UserProfilePage
