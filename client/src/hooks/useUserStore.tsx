import { create } from 'zustand'
import { User } from '../models'
import { devtools } from 'zustand/middleware'

interface UserStore {
   currentUser: User | null

   dispatchCurrentUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>()(
   devtools((set) => ({
      currentUser: null,

      dispatchCurrentUser: (value: User | null) =>
         set((state) => ({ currentUser: value }), false, 'dispatchCurrentUser'),
   }))
)

export default useUserStore
