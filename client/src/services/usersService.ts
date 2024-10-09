import { User, UserEditForm } from '../models'
import { apiTwitter } from '../lib/axios'
import { isAxiosError } from 'axios'

const apiURL = 'http://localhost:3040'

interface ResponseApi {
   user: User & { followersCount: number }
   users: User[]
   message: string
}

export async function getUsers() {
   type UsersRes = Pick<ResponseApi, 'users'>
   try {
      const { data } = await apiTwitter.get<UsersRes>(`${apiURL}/users`)
      return data
   } catch {
      throw new Error('Error in getUsers') // Lanza un error que puede ser manejado en el componente
   }
}

export async function getUserById(userId: User['id']) {
   type UsersRes = Pick<ResponseApi, 'user'>
   try {
      const { data } = await apiTwitter.get<UsersRes>(`${apiURL}/users/${userId}`)
      return data
   } catch {
      throw new Error('Error in getUserById') // Lanza un error que puede ser manejado en el componente
   }
}

export async function editUser(userData: UserEditForm) {
   type UsersRes = Pick<ResponseApi, 'user' | 'message'>
   try {
      const { data } = await apiTwitter.patch<UsersRes>(`${apiURL}/users/edit`, userData)
      return data
   } catch (error) {
      console.log('# ERROR: editUser', error)

      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.message)
      } else if (error instanceof Error) {
         throw new Error(error.message)
      } else {
         throw new Error('Error in editUser')
      }
   }
}
