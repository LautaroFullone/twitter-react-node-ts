import {
   AppLayout,
   ErrorPage,
   HomePage,
   NotificationsPage,
   PostDetailsPage,
   UserProfilePage,
} from './layouts'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<AppLayout />}>
               <Route path="/" element={<HomePage />} index />

               <Route element={<PrivateRoute />}>
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/profile/:userId" element={<UserProfilePage />} />
                  <Route path="/post/:postId" element={<PostDetailsPage />} />
               </Route>
            </Route>

            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/error" />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
