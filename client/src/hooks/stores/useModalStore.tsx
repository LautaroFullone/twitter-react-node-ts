import { create } from 'zustand'

interface AuthModalStoreProps {
   isLoginModalOpen: boolean
   isRegisterModalOpen: boolean
   isEditModalOpen: boolean

   modalActions: {
      openLoginModal: () => void
      closeLoginModal: () => void
      openRegisterModal: () => void
      closeRegisterModal: () => void
      openEditModal: () => void
      closeEditModal: () => void
   }
}

const INITIAL_STATE: Omit<AuthModalStoreProps, 'modalActions'> = {
   isEditModalOpen: false,
   isLoginModalOpen: false,
   isRegisterModalOpen: false,
}

const useModalStore = create<AuthModalStoreProps>((set) => ({
   ...INITIAL_STATE,

   modalActions: {
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
      openEditModal: () => {
         set({ isEditModalOpen: true })
      },
      closeEditModal: () => {
         set({ isEditModalOpen: false })
      },
   },
}))

export default useModalStore
