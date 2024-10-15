/* eslint-disable @typescript-eslint/no-unused-vars */
import { devtools } from 'zustand/middleware'
import { User } from '../../models'
import { create } from 'zustand'

interface UserStoreProps {
   currentUser: User | null

   userActions: {
      dispatchCurrentUser: (value: User | null) => void
      updateUserProfileImg: (imgSrc: User['profileImage'] | null) => void
   }
}

const INITIAL_STATE: Omit<UserStoreProps, 'userActions'> = {
   currentUser: null,
}

export const useUserStore = create<UserStoreProps>()(
   devtools((set, get) => ({
      currentUser: INITIAL_STATE.currentUser,

      userActions: {
         dispatchCurrentUser: (value: User | null) => {
            set((_state) => ({ currentUser: value }), false, 'dispatchCurrentUser')
         },
         updateUserProfileImg: (imgSrc: User['profileImage'] | null) => {
            const { currentUser: currentUserData } = get()
            if (currentUserData) {
               set({ currentUser: { ...currentUserData, profileImage: imgSrc } })
            }
         },
      },
   }))
)

export default useUserStore
