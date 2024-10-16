import { ClipLoader } from 'react-spinners'

const Spinner = () => {
   return (
      <div
         className="flex
            justify-center
            items-center
            h-full"
      >
         <ClipLoader color="lightblue" size={80} />
      </div>
   )
}

export default Spinner
