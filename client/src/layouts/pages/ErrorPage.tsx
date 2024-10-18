import { BiXCircle } from 'react-icons/bi'
import { Button } from '../../components'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
         <div className="max-w-md w-full text-center transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
            <div className="relative inline-block">
               <BiXCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />

               <div className="absolute top-0 left-0 w-full h-full animate-ping">
                  <BiXCircle className="w-24 h-24 text-red-500 opacity-75" />
               </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">An error occurred</h1>

            <p className="text-gray-400 mb-8">Sorry, something went wrong. Please try again</p>

            <div className="flex flex-col space-y-4">
               <Button label="Go Home" onClick={() => navigate('/')} fullWidth large outline />
            </div>
         </div>
         <div className="mt-12 text-gray-500 text-sm ">We're working to fix the problem</div>
      </div>
   )
}

export default ErrorPage
