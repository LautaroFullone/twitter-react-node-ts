import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { useCallback } from 'react'

interface PageHeaderProps {
   label?: string
   showBackArrow?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({ label, showBackArrow = false }) => {
   const navigate = useNavigate()

   const handleBack = useCallback(() => {
      navigate(-1)
   }, [navigate])

   return (
      <div className="border-b-[1px] border-neutral-800 p-5">
         <div className="flex flex-row items-center gap-2">
            {showBackArrow && (
               <BiArrowBack
                  onClick={handleBack}
                  color="white"
                  size={20}
                  className="
                     cursor-pointer
                     hover:opacity-70
                     transition
                  "
               />
            )}
            <h1 className="text-white text-xl font-semibold">{label}</h1>
         </div>
      </div>
   )
}

export default PageHeader
