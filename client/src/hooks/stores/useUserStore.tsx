/* eslint-disable @typescript-eslint/no-unused-vars */
import { devtools } from 'zustand/middleware'
import { User } from '../../models'
import { create } from 'zustand'

interface UserStoreProps {
   currentUser: User | null

   userActions: {
      dispatchCurrentUser: (value: User | null) => void
   }
}

const INITIAL_STATE: Omit<UserStoreProps, 'userActions'> = {
   currentUser: null,
}

export const useUserStore = create<UserStoreProps>()(
   devtools((set) => ({
      currentUser: INITIAL_STATE.currentUser,

      userActions: {
         dispatchCurrentUser: (value: User | null) => {
            set((state) => ({ currentUser: value }), false, 'dispatchCurrentUser')
         },
      },
   }))
)

export default useUserStore
