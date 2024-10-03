import { PageHeader } from '../../components'
import useAuth from '../../hooks/api/useAuth'

const HomePage = () => {
   const { currentUser } = useAuth()

   return (
      <>
         <PageHeader label="Home" />
         <p className="text-white">Hola {currentUser?.name}</p>
      </>
   )
}

export default HomePage
