/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
   loginSuccess: boolean

   dispatchLoginSuccess: (value: boolean) => void
}

export const useUserStore = create<UserStore>()(
   devtools((set) => ({
      loginSuccess: false,

      dispatchLoginSuccess: (value: boolean) =>
         set((state) => ({ loginSuccess: value }), false, 'dispatchLoginSuccess'),
   }))
)

export default useUserStore
