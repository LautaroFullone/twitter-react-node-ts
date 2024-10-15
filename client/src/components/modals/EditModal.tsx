import { useUserStore, useBasicForm, useModalStore } from '../../hooks'
import useMutationEditUser from '../../hooks/api/useMutationEditUser'
import { UserEditForm } from '../../models/User'
import { BiCamera, BiX } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import { useEffect, useRef } from 'react'

const initialFormData: UserEditForm = {
   name: '',
   username: '',
   bio: '',
   coverImage: null,
   profileImage: null,
}

const EditModal = () => {
   const { formData, handleChange, setFormData } = useBasicForm(initialFormData)
   const { editCurrentUser, isLoading } = useMutationEditUser()
   const { modalActions, isEditModalOpen } = useModalStore()
   const { currentUser } = useUserStore()

   const coverImageInputRef = useRef<HTMLInputElement>(null)
   const profileImageInputRef = useRef<HTMLInputElement>(null)

   useEffect(() => {
      if (currentUser) {
         setFormData({
            name: currentUser.name || '',
            username: currentUser.username || '',
            bio: currentUser.bio || '',
            coverImage: currentUser.coverImage || '',
            profileImage: currentUser.profileImage || '',
         })
      }
   }, [currentUser, setFormData])

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      await editCurrentUser(formData)
   }

   function handleImageUpload(
      e: React.ChangeEvent<HTMLInputElement>,
      imageField: 'coverImage' | 'profileImage'
   ) {
      const file = e.target.files?.[0]
      if (file) {
         const reader = new FileReader()

         reader.onloadend = () => {
            const evtChange = {
               target: {
                  name: imageField,
                  value: reader.result as string,
               },
            }
            //workarround to re-use handleChange from useBasicForm
            handleChange(evtChange as React.ChangeEvent<HTMLInputElement>)
         }

         reader.readAsDataURL(file)
      }
   }

   return (
      <>
         {isEditModalOpen && (
            <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-center justify-center p-4">
               <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-lg relative">
                  <div className="relative h-32 bg-blue-300">
                     <button
                        onClick={() => modalActions.closeEditModal()}
                        className="absolute top-3 right-3 text-white hover:text-gray-700"
                        disabled={isLoading}
                     >
                        <BiX size={20} />
                     </button>

                     {formData.coverImage && (
                        <img
                           src={formData.coverImage}
                           alt="Cover"
                           className="w-full h-full object-cover"
                        />
                     )}
                     <button
                        onClick={() => coverImageInputRef.current?.click()}
                        className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors z-40"
                        aria-label="Cambiar imagen de portada"
                     >
                        <BiCamera size={20} />
                     </button>
                     <input
                        type="file"
                        ref={coverImageInputRef}
                        onChange={(evt) => handleImageUpload(evt, 'coverImage')}
                        accept="image/*"
                        className="hidden"
                     />
                  </div>

                  <div className="relative -mt-16 ml-4 mb-4">
                     <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                        {formData.profileImage ? (
                           <img
                              src={formData.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                           />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-500">
                              <BsTwitter size={40} />
                           </div>
                        )}
                     </div>
                     <button
                        onClick={() => profileImageInputRef.current?.click()}
                        className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                        aria-label="Cambiar imagen de perfil"
                     >
                        <BiCamera size={20} />
                     </button>
                     <input
                        type="file"
                        ref={profileImageInputRef}
                        onChange={(evt) => handleImageUpload(evt, 'profileImage')}
                        accept="image/*"
                        className="hidden"
                     />
                  </div>
                  <div className="px-8 pb-8">
                     <h2 className="text-2xl font-bold text-center mb-6">Editar perfil</h2>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                           >
                              Nombre
                           </label>
                           <input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              disabled={isLoading}
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-700 mb-1"
                           >
                              Nombre de usuario
                           </label>
                           <input
                              id="username"
                              name="username"
                              type="text"
                              value={formData.username}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              disabled={isLoading}
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="bio"
                              className="block text-sm font-medium text-gray-700 mb-1"
                           >
                              Biografía
                           </label>
                           <textarea
                              id="bio"
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                              disabled={isLoading}
                           />
                        </div>

                        <button
                           type="submit"
                           className={`w-full bg-blue-500 text-white py-2 rounded-full transition-colors ${
                              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
                           }`}
                           disabled={isLoading}
                        >
                           {isLoading ? (
                              <span className="flex items-center justify-center">
                                 <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                 >
                                    <circle
                                       className="opacity-25"
                                       cx="12"
                                       cy="12"
                                       r="10"
                                       stroke="currentColor"
                                       strokeWidth="4"
                                    ></circle>
                                    <path
                                       className="opacity-75"
                                       fill="currentColor"
                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                 </svg>
                                 Actualizando...
                              </span>
                           ) : (
                              'Guardar cambios'
                           )}
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default EditModal
