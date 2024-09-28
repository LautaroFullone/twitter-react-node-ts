import { create } from 'zustand'

interface AuthModalStore {
   isLoginModalOpen: boolean
   isRegisterModalOpen: boolean

   openLoginModal: () => void
   closeLoginModal: () => void
   openRegisterModal: () => void
   closeRegisterModal: () => void
}

export const useModalStore = create<AuthModalStore>((set) => ({
   isLoginModalOpen: true,
   isRegisterModalOpen: false,

   openLoginModal: () => {
      set({ isLoginModalOpen: true, isRegisterModalOpen: false })
   },
   closeLoginModal: () => {
      set({ isLoginModalOpen: false })
   },
   openRegisterModal: () => {
      set({ isLoginModalOpen: false, isRegisterModalOpen: true })
   },
   closeRegisterModal: () => {
      set({ isRegisterModalOpen: false })
   },
}))

export default useModalStore
