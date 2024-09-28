import { create } from 'zustand'
import { User } from '../models'

interface UserStore {
   currentUser: User | null

   dispatchCurrentUser: (user: User) => void
}

export const useUserStore = create<UserStore>()((set) => ({
   currentUser: null,

   dispatchCurrentUser: (user: User) => set({ currentUser: user }),
}))

export default useUserStore
