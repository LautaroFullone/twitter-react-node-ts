import { isAxiosError } from 'axios'
import { apiTwitter } from '../lib/axios'
import { User, UserLoginForm, UserRegisterForm } from '../models'

interface ResponseApi {
   user: User
   message: string
   token: string
}

export async function register(registerUser: UserRegisterForm) {
   try {
      type Res = Pick<ResponseApi, 'user' | 'message'>
      const { data } = await apiTwitter.post<Res>(`/auth/register`, registerUser)

      return data
   } catch (error) {
      console.log('# ERROR: login', error)

      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.message)
      } else if (error instanceof Error) {
         throw new Error(error.message)
      } else {
         throw new Error('An unknown error has ocurred')
      }
   }
}

export async function login(loginUser: UserLoginForm) {
   try {
      type Res = Pick<ResponseApi, 'user' | 'token' | 'message'>
      const { data } = await apiTwitter.post<Res>(`/auth/login`, loginUser)

      return data
   } catch (error) {
      console.log('# ERROR: login', error)

      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.message)
      } else if (error instanceof Error) {
         throw new Error(error.message)
      } else {
         throw new Error('An unknown error has ocurred')
      }
   }
}

export async function authenticatedUser() {
   try {
      type Res = Pick<ResponseApi, 'user'>
      const { data } = await apiTwitter.get<Res>(`/auth/authenticated-user`)

      return data.user
   } catch (error) {
      console.log('# ERROR: authenticatedUser', error)
      return null
   }
}
