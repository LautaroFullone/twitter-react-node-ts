import {
   AppLayout,
   ErrorPage,
   HomePage,
   NotificationsPage,
   PostDetailsPage,
   UserProfilePage,
} from './layouts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<AppLayout />}>
               <Route path="/" element={<HomePage />} index />
               <Route path="/notifications" element={<NotificationsPage />} />
               <Route path="/profile/:userId" element={<UserProfilePage />} />
               <Route path="/post/:postId" element={<PostDetailsPage />} />
            </Route>
            <Route path="/error" element={<ErrorPage />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
