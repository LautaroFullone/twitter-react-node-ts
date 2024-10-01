import axios from 'axios'
import { User } from '../models'

const apiURL = 'http://localhost:3040'

interface ResponseApi {
   user: User & { followersCount: number }
   users: User[]
   message: string
}

export async function getUsers() {
   type UsersRes = Pick<ResponseApi, 'users'>
   try {
      const { data } = await axios.get<UsersRes>(`${apiURL}/users`)
      return data
   } catch {
      throw new Error('Error in getUsers') // Lanza un error que puede ser manejado en el componente
   }
}

export async function getUserById(userId: User['id']) {
   type UsersRes = Pick<ResponseApi, 'user'>
   try {
      const { data } = await axios.get<UsersRes>(`${apiURL}/users/${userId}`)
      return data
   } catch {
      throw new Error('Error in getUserById') // Lanza un error que puede ser manejado en el componente
   }
}
