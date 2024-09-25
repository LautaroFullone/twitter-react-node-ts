import { useCallback, useState } from 'react'
import { Modal } from '../Modal'
import Input from '../Input'
import toast from 'react-hot-toast'
import useModalStore from '../../hooks/useModalStore'

const RegisterModal = () => {
   const { isRegisterModalOpen, openRegisterModal, closeRegisterModal } =
      useModalStore()
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const onToggle = useCallback(() => {
      if (isLoading) {
         return
      }

      openRegisterModal()
   }, [isLoading, openRegisterModal])

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         // await axios.post('/api/register', {
         //    email,
         //    password,
         //    username,
         //    name,
         // })

         toast.success('Account created', { duration: 2000 })

         // signIn('credentials', { email, password })

         // registerModalState.onClose()
      } catch (error) {
         console.log(error)
         toast.error('Something went wrong')
      } finally {
         setIsLoading(false)
      }
   }, [email, name, password, username])

   return (
      // <p>Register Modal</p>
      <Modal
         disabled={isLoading}
         isOpen={isRegisterModalOpen}
         title="Create an Account"
         actionLabel="Register"
         onClose={closeRegisterModal}
         onSubmit={onSubmit}
         body={
            <div className="flex flex-col gap-4">
               <Input
                  placeholder="Email"
                  onChange={(evt) => setEmail(evt.target.value)}
                  value={email}
                  disabled={isLoading}
               />
               <Input
                  placeholder="Name"
                  onChange={(evt) => setName(evt.target.value)}
                  value={name}
                  disabled={isLoading}
               />
               <Input
                  placeholder="Username"
                  onChange={(evt) => setUsername(evt.target.value)}
                  value={username}
                  disabled={isLoading}
               />
               <Input
                  placeholder="Password"
                  type="password"
                  onChange={(evt) => setPassword(evt.target.value)}
                  value={password}
                  disabled={isLoading}
               />
            </div>
         }
         footer={
            <div className="text-neutral-400 text-center mt-4">
               <p>
                  Already have an account?{' '}
                  <span
                     onClick={onToggle}
                     className="text-white cursor-pointer hover:underline"
                  >
                     Sign In
                  </span>
               </p>
            </div>
         }
      />
   )
}

export default RegisterModal
