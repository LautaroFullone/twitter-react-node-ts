import { Form, PageHeader, PostsFeed } from '../../components'

const HomePage = () => {
   return (
      <>
         <PageHeader label="Home" />

         <Form placeholder="What´s happening?" />

         <PostsFeed />
      </>
   )
}

export default HomePage
