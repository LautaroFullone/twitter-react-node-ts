import { useBasicForm, useMutationLogin, useModalStore } from '../../hooks'
import { UserLoginForm } from '../../models'
import AuthModal from './AuthModal'

const initialFormData: UserLoginForm = {
   email: '',
   password: '',
}

const LoginModal = () => {
   const { formData, handleChange, resetForm } = useBasicForm(initialFormData)
   const { modalActions, isLoginModalOpen } = useModalStore()
   const { loginUser, isLoading } = useMutationLogin()

   async function handleSubmit(evt: React.FormEvent) {
      evt.preventDefault()
      await loginUser(formData)
      resetForm()
      modalActions.closeLoginModal()
   }

   return (
      <AuthModal type="LOGIN" isOpen={isLoginModalOpen} isLoading={isLoading}>
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
               </label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
               />
            </div>

            <div className="mb-4">
               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
               </label>
               <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
               />
            </div>

            <button
               type="submit"
               disabled={isLoading}
               className={`w-full 
                  bg-blue-500 
                  text-white 
                  py-2 
                  rounded-full 
                  transition-colors 
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}
                  mt-4`}
            >
               {!isLoading ? (
                  'Iniciar sesión'
               ) : (
                  <span className="flex items-center justify-center">
                     <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                     >
                        <circle
                           className="opacity-25"
                           cx="12"
                           cy="12"
                           r="10"
                           stroke="currentColor"
                           strokeWidth="4"
                        ></circle>
                        <path
                           className="opacity-75"
                           fill="currentColor"
                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                     </svg>
                     Procesando...
                  </span>
               )}
            </button>
         </form>
      </AuthModal>
   )
}
export default LoginModal

// const LoginModal = () => {
//    // const loginModalState = useMutationLoginModalState()
//    // const registerModalState = useMutationRegisterModalState()

//    const [email, setEmail] = useState('')
//    const [password, setPassword] = useState('')
//    const [isLoading, setIsLoading] = useState(false)

//    const onToggle = useCallback(() => {
//       if (isLoading) {
//          return
//       }

//       // loginModalState.onClose()
//       // registerModalState.onOpen()
//    }, [isLoading])

//    const onSubmit = useCallback(async () => {
//       try {
//          setIsLoading(true)

//          // await signIn('credentials', { email, password })

//          // loginModalState.onClose()
//       } catch (error) {
//          console.log(error)
//       } finally {
//          setIsLoading(false)
//       }
//    }, [email, password])

//    return (
//       <p>Login Modal</p>
//       // <Modal
//       //    disabled={isLoading}
//       //    // isOpen={loginModalState.isOpen}
//       //    title="Login"
//       //    actionLabel="Sign In"
//       //    // onClose={loginModalState.onClose}
//       //    onSubmit={onSubmit}
//       //    body={
//       //       <div className="flex flex-col gap-4">
//       //          <Input
//       //             placeholder="Email"
//       //             onChange={(evt) => setEmail(evt.target.value)}
//       //             value={email}
//       //             disabled={isLoading}
//       //          />
//       //          <Input
//       //             placeholder="Password"
//       //             type="password"
//       //             onChange={(evt) => setPassword(evt.target.value)}
//       //             value={password}
//       //             disabled={isLoading}
//       //          />
//       //       </div>
//       //    }
//       //    footer={
//       //       <div className="text-neutral-400 text-center mt-4">
//       //          <p>
//       //             First time usign Twitter?{' '}
//       //             <span
//       //                onClick={onToggle}
//       //                className="text-white cursor-pointer hover:underline"
//       //             >
//       //                Create an account
//       //             </span>
//       //          </p>
//       //       </div>
//       //    }
//       // />
//    )
// }

// export default LoginModal
