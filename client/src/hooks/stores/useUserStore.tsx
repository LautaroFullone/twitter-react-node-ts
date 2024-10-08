/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '../../models'

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
