import { useState } from 'react'
import { BsTwitter } from 'react-icons/bs'
import useModalStore from '../../hooks/useModalStore'

const LoginModal = () => {
   const { isLoginModalOpen } = useModalStore()
   const [isLogin, setIsLogin] = useState(true)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      // Simulamos un proceso de autenticación
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(isLogin ? 'Iniciando sesión' : 'Registrando', {
         email,
         password,
      })
      setIsLoading(false)
   }

   return (
      <>
         {isLoginModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
               <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                  <div className="flex justify-center mb-6">
                     <BsTwitter className="text-blue-400 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-2">
                     {isLogin
                        ? 'Iniciar sesión en Twitter'
                        : 'Regístrate en Twitter'}
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                     {isLogin
                        ? 'Ingresa tus credenciales para acceder a tu cuenta'
                        : 'Crea una nueva cuenta en Twitter'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Correo electrónico
                        </label>
                        <input
                           id="email"
                           type="email"
                           placeholder="nombre@ejemplo.com"
                           value={email}
                           onChange={(evt) => setEmail(evt.target.value)}
                           required
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           disabled={isLoading}
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Contraseña
                        </label>
                        <input
                           id="password"
                           type="password"
                           value={password}
                           onChange={(evt) => setPassword(evt.target.value)}
                           required
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           disabled={isLoading}
                        />
                     </div>
                     <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded-full transition-colors ${
                           isLoading
                              ? 'opacity-70 cursor-not-allowed'
                              : 'hover:bg-blue-600'
                        }`}
                        disabled={isLoading}
                     >
                        {isLoading ? (
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
                        ) : isLogin ? (
                           'Iniciar sesión'
                        ) : (
                           'Registrarse'
                        )}
                     </button>
                  </form>
                  <div className="mt-4 text-center">
                     <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                        disabled={isLoading}
                     >
                        {isLogin
                           ? '¿No tienes una cuenta? Regístrate'
                           : '¿Ya tienes una cuenta? Inicia sesión'}
                     </button>
                  </div>
                  <button
                     onClick={() => {}}
                     className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                     disabled={isLoading}
                  >
                     ✕
                  </button>
               </div>
            </div>
         )}
      </>
   )
}
export default LoginModal

// const LoginModal = () => {
//    // const loginModalState = useLoginModalState()
//    // const registerModalState = useRegisterModalState()

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
