import { Form, PageHeader } from '../../components'
import { useUserStore } from '../../hooks'

const HomePage = () => {
   const { currentUser } = useUserStore()

   return (
      <>
         <PageHeader label="Home" />
         <p className="text-white">Hola {currentUser?.name}</p>
         <Form placeholder="What´s happening?" />
      </>
   )
}

export default HomePage
