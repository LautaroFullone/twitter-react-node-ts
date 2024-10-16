import { User, UserEditForm } from '../models'
import { apiTwitter } from '../lib/axios'

const apiURL = 'http://localhost:3040'

interface ResponseApi {
   user: User & { followersCount: number }
   users: User[]
   idUserProfile: User['id']
   message: string
}

export async function getUsers() {
   type UsersRes = Pick<ResponseApi, 'users'>
   try {
      const { data } = await apiTwitter.get<UsersRes>(`${apiURL}/users`)
      return data
   } catch {
      throw new Error('Error in getUsers')
   }
}

export async function getUserById(userId: User['id']) {
   type UsersRes = Pick<ResponseApi, 'user'>
   try {
      const { data } = await apiTwitter.get<UsersRes>(`${apiURL}/users/${userId}`)
      return data
   } catch {
      throw new Error('Error in getUserById')
   }
}

export async function editUser(userData: UserEditForm) {
   type UsersRes = Pick<ResponseApi, 'user' | 'message'>
   try {
      const { data } = await apiTwitter.patch<UsersRes>(`${apiURL}/users/edit`, userData)
      return data
   } catch {
      throw new Error('Error in editUser')
   }
}

export async function followUser(idToFollow: User['id']) {
   type UsersRes = Pick<ResponseApi, 'user' | 'message' | 'idUserProfile'>
   try {
      const { data } = await apiTwitter.post<UsersRes>(`${apiURL}/users/follow/${idToFollow}`)
      return data
   } catch {
      throw new Error('Error in followUser')
   }
}

export async function unfollowUser(idToUnfollow: User['id']) {
   type UsersRes = Pick<ResponseApi, 'user' | 'message' | 'idUserProfile'>
   try {
      const { data } = await apiTwitter.post<UsersRes>(`${apiURL}/users/unfollow/${idToUnfollow}`)
      return data
   } catch {
      throw new Error('Error in unfollowUser')
   }
}
