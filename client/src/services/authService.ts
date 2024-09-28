import axios from 'axios'
import { User, UserLoginForm, UserRegisterForm } from '../models'

const apiURL = 'http://localhost:3040'

interface ResponseApi {
   user: User
   message: string
   token: string
}

export async function register(registerUser: UserRegisterForm) {
   type RegisterRes = Pick<ResponseApi, 'user' | 'message'>
   return axios.post<RegisterRes>(`${apiURL}/auth/register`, registerUser)
}

export async function login(loginUser: UserLoginForm) {
   type LoginRes = Pick<ResponseApi, 'user' | 'token' | 'message'>
   return axios.post<LoginRes>(`${apiURL}/auth/login`, loginUser)
}
