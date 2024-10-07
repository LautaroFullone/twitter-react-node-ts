import { useState } from 'react'

const useBasicForm = <T,>(initialState: T) => {
   const [formData, setFormData] = useState<T>(initialState)

   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const resetForm = () => {
      setFormData(initialState)
   }

   return { formData, handleChange, resetForm, setFormData }
}

export default useBasicForm
