// import { useEffect, useState } from 'react'
// import { useAuth, useBasicForm } from '../../hooks'
// import { UserEditForm } from '../../models/User'
// import useEditUser from '../../hooks/api/useEditUser'

// const initialFormData: UserEditForm = {
//    name: '',
//    username: '',
//    bio: '',
//    coverImage: '',
//    profileImage: '',
// }
// //TODO: TERMINAR ESTO
// const EditModal = () => {
//    const { currentUser } = useAuth()
//    // const { data } = useGetUserById(currentUser?.id)
//    const { formData, handleChange, setFormData } = useBasicForm(initialFormData)

//    useEffect(() => {
//       if (currentUser) {
//          setFormData({
//             name: currentUser.name || '',
//             username: currentUser.username || '',
//             bio: currentUser.bio || '',
//             coverImage: currentUser.coverImage || '',
//             profileImage: currentUser.profileImage || '',
//          })
//       }
//    }, [currentUser, setFormData])

//    // const [isLoading, setIsLoading] = useState(false)
//    const { mutate: editUser } = useEditUser()

//    const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault()
//       mutation.mutate({ name, username, bio, coverImage, profileImage })
//    }

//    const handleImageUpload = (
//       e: React.ChangeEvent<HTMLInputElement>,
//       setImage: (value: string | null) => void
//    ) => {
//       const file = e.target.files?.[0]
//       if (file) {
//          const reader = new FileReader()
//          reader.onloadend = () => {
//             setImage(reader.result as string)
//          }
//          reader.readAsDataURL(file)
//       }
//    }

//    return (
//       <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-lg">
//          <div className="relative h-32 bg-blue-100">
//             {formData.coverImage && (
//                <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
//             )}
//             <button
//                onClick={() => coverImageInputRef.current?.click()}
//                className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
//                aria-label="Cambiar imagen de portada"
//             >
//                <Camera size={20} />
//             </button>
//             <input
//                type="file"
//                ref={coverImageInputRef}
//                onChange={(e) => handleImageUpload(e, setCoverImage)}
//                accept="image/*"
//                className="hidden"
//             />
//          </div>
//          <div className="relative -mt-16 ml-4 mb-4">
//             <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
//                {profileImage ? (
//                   <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//                ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-500">
//                      <Twitter size={40} />
//                   </div>
//                )}
//             </div>
//             <button
//                onClick={() => profileImageInputRef.current?.click()}
//                className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
//                aria-label="Cambiar imagen de perfil"
//             >
//                <Camera size={20} />
//             </button>
//             <input
//                type="file"
//                ref={profileImageInputRef}
//                onChange={(e) => handleImageUpload(e, setProfileImage)}
//                accept="image/*"
//                className="hidden"
//             />
//          </div>
//          <div className="px-8 pb-8">
//             <h2 className="text-2xl font-bold text-center mb-6">Editar perfil</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                      Nombre
//                   </label>
//                   <input
//                      id="name"
//                      type="text"
//                      value={name}
//                      onChange={(e) => setName(e.target.value)}
//                      required
//                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                      disabled={mutation.isLoading}
//                   />
//                </div>
//                <div>
//                   <label
//                      htmlFor="username"
//                      className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                      Nombre de usuario
//                   </label>
//                   <input
//                      id="username"
//                      type="text"
//                      value={username}
//                      onChange={(e) => setUsername(e.target.value)}
//                      required
//                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                      disabled={mutation.isLoading}
//                   />
//                </div>
//                <div>
//                   <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                      Biografía
//                   </label>
//                   <textarea
//                      id="bio"
//                      value={bio}
//                      onChange={(e) => setBio(e.target.value)}
//                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                      rows={3}
//                      disabled={mutation.isLoading}
//                   />
//                </div>
//                {mutation.isError && (
//                   <div className="text-center p-2 rounded bg-red-100 text-red-800">
//                      Error al actualizar el perfil. Por favor, intenta de nuevo.
//                   </div>
//                )}
//                {mutation.isSuccess && (
//                   <div className="text-center p-2 rounded bg-green-100 text-green-800">
//                      Perfil actualizado exitosamente.
//                   </div>
//                )}
//                <button
//                   type="submit"
//                   className={`w-full bg-blue-500 text-white py-2 rounded-full transition-colors ${
//                      mutation.isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
//                   }`}
//                   disabled={mutation.isLoading}
//                >
//                   {mutation.isLoading ? (
//                      <span className="flex items-center justify-center">
//                         <svg
//                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                            xmlns="http://www.w3.org/2000/svg"
//                            fill="none"
//                            viewBox="0 0 24 24"
//                         >
//                            <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                            ></circle>
//                            <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                            ></path>
//                         </svg>
//                         Actualizando...
//                      </span>
//                   ) : (
//                      'Guardar cambios'
//                   )}
//                </button>
//             </form>
//          </div>
//       </div>
//    )
// }

// export default EditModal
