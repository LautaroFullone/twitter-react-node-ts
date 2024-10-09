import { ReactNode } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { BiX } from 'react-icons/bi'
import { useModalStore } from '../../hooks'

interface ModalProps {
   type: 'LOGIN' | 'REGISTER'
   isOpen: boolean
   isLoading: boolean
   children?: ReactNode
}

const AuthModal: React.FC<ModalProps> = ({ type, isLoading = false, isOpen = false, children }) => {
   const { modalActions } = useModalStore()

   return (
      <>
         {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-30">
               <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
                  <button
                     onClick={() => {
                        if (type === 'LOGIN') return modalActions.closeLoginModal()
                        else return modalActions.closeRegisterModal()
                     }}
                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                     disabled={isLoading}
                  >
                     <BiX size={20} />
                  </button>
                  <div className="flex justify-center mb-6">
                     <BsTwitter className="text-blue-400 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-2">
                     {type == 'LOGIN' ? 'Iniciar sesión en Twitter' : 'Regístrate en Twitter'}
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                     {type == 'LOGIN'
                        ? 'Ingresa tus credenciales para acceder a tu cuenta'
                        : 'Crea una nueva cuenta'}
                  </p>

                  <div className="mt-4">{children}</div>

                  <div className="mt-4 text-center">
                     <button
                        onClick={() => {
                           if (type === 'LOGIN') {
                              modalActions.closeLoginModal()
                              modalActions.openRegisterModal()
                           } else {
                              modalActions.closeRegisterModal()
                              modalActions.openLoginModal()
                           }
                        }}
                        className="text-blue-500 hover:underline"
                        disabled={isLoading}
                     >
                        {type == 'LOGIN'
                           ? '¿No tienes una cuenta? Regístrate'
                           : '¿Ya tienes una cuenta? Inicia sesión'}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default AuthModal
