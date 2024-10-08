import { PageHeader } from '../../components'
import { useUserStore } from '../../hooks'

const HomePage = () => {
   const { currentUser } = useUserStore()

   return (
      <>
         <PageHeader label="Home" />
         <p className="text-white">Hola {currentUser?.name}</p>
      </>
   )
}

export default HomePage
