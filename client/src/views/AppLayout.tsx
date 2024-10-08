/* eslint-disable @typescript-eslint/no-unused-vars */
import { FollowBar, LoginModal, RegisterModal, Sidebar } from '../components'
import { useGetCurrentUser, useUserStore } from '../hooks'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

const AppLayout = () => {
   const { currentUserApi } = useGetCurrentUser()
   const { currentUser, userActions } = useUserStore()

   useEffect(() => {
      if (!currentUser && currentUserApi) {
         userActions.dispatchCurrentUser(currentUserApi)
      }
   }, [currentUser, currentUserApi, userActions])

   return (
      <div className="h-screen bg-black">
         <LoginModal />
         <RegisterModal />

         <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
               <Sidebar />

               <div
                  className="
                    col-span-3 
                    lg:col-span-2 
                    border-x-[1px] 
                    border-neutral-800"
               >
                  <Outlet />
               </div>

               <FollowBar />
            </div>
         </div>
         <Toaster />
      </div>
   )
}

export default AppLayout
