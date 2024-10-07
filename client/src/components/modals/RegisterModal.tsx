import AuthModal from './AuthModal'
import { useBasicForm, useModalStore } from '../../hooks'
import { useState } from 'react'
import { register } from '../../services'
import { UserRegisterForm } from '../../models'
import toast from 'react-hot-toast'

const initialFormData: UserRegisterForm = {
   name: '',
   email: '',
   username: '',
   password: '',
}

const RegisterModal = () => {
   const { isRegisterModalOpen } = useModalStore()
   const { formData, handleChange, resetForm } = useBasicForm(initialFormData)

   const [isLoading, setIsLoading] = useState(false)

   async function handleSubmit(evt: React.FormEvent) {
      evt.preventDefault()
      setIsLoading(true)

      //TODO: fixear esto
      await register(formData)
         .then(({ data }) => {
            resetForm()
            toast.success(data.message)
         })
         .catch(({ response }) => {
            console.log('error')
            toast.error(response.data || 'Register Error')
         })
      setIsLoading(false)
   }

   return (
      <AuthModal type="REGISTER" isOpen={isRegisterModalOpen} isLoading={isLoading}>
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
               </label>
               <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="German Beder"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
               />
            </div>

            <div className="mb-4">
               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
               </label>
               <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="@gercho_sports"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
               />
            </div>

            <div className="mb-4">
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
               </label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="gbeder@vorterix.com"
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
                  'Registrarse'
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

   // return (
   //    // <p>Register Modal</p>
   //    <Modal
   //       disabled={isLoading}
   //       isOpen={isRegisterModalOpen}
   //       title="Create an Account"
   //       actionLabel="Register"
   //       onClose={closeRegisterModal}
   //       onSubmit={onSubmit}
   //       body={
   //          <div className="flex flex-col gap-4">
   //             <Input
   //                placeholder="Email"
   //                onChange={(evt) => setEmail(evt.target.value)}
   //                value={email}
   //                disabled={isLoading}
   //             />
   //             <Input
   //                placeholder="Name"
   //                onChange={(evt) => setName(evt.target.value)}
   //                value={name}
   //                disabled={isLoading}
   //             />
   //             <Input
   //                placeholder="Username"
   //                onChange={(evt) => setUsername(evt.target.value)}
   //                value={username}
   //                disabled={isLoading}
   //             />
   //             <Input
   //                placeholder="Password"
   //                type="password"
   //                onChange={(evt) => setPassword(evt.target.value)}
   //                value={password}
   //                disabled={isLoading}
   //             />
   //          </div>
   //       }
   //       footer={
   //          <div className="text-neutral-400 text-center mt-4">
   //             <p>
   //                Already have an account?{' '}
   //                <span
   //                   onClick={onToggle}
   //                   className="text-white cursor-pointer hover:underline"
   //                >
   //                   Sign In
   //                </span>
   //             </p>
   //          </div>
   //       }
   //    />
   // )
}

export default RegisterModal
