import { AppLayout, HomePage, UserProfilePage } from './views'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<AppLayout />}>
               <Route path="/" element={<HomePage />} index />
               <Route path="/profile/:userId" element={<UserProfilePage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App
