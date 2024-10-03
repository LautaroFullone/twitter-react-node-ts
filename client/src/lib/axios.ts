import axios from 'axios'

export const apiTwitter = axios.create({
   baseURL: 'http://localhost:3040',
})

apiTwitter.interceptors.request.use((config) => {
   const token = sessionStorage.getItem('session_token')

   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }

   return config
})
