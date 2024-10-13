import { useModalStore, useUserStore } from '../hooks'

interface FormProps {
   placeholder: string
   isComment?: boolean
   postId?: string
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
   const {} = useModalStore()
   const { currentUser } = useUserStore()

   return <div>Form</div>
}

export default Form
