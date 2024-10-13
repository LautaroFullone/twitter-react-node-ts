import { apiTwitter } from '../lib/axios'
import { User } from '../models'
import { Posts } from '../models/Posts'

const apiURL = 'http://localhost:3040'

interface ResponseApi {
   posts: Posts[]
   message: string
}

export async function getPosts() {
   type PostsRes = Pick<ResponseApi, 'posts'>
   try {
      const { data } = await apiTwitter.get<PostsRes>(`${apiURL}/posts`)
      return data
   } catch {
      throw new Error('Error in getPosts')
   }
}

export async function getPostByUser(userId: User['id']) {
   type PostsRes = Pick<ResponseApi, 'posts'>
   try {
      const { data } = await apiTwitter.get<PostsRes>(`${apiURL}/posts/user/${userId}`)
      return data
   } catch {
      throw new Error('Error in getPostByUser')
   }
}

// export async function getPostByUser(userId: User['id']) {
//    type PostsRes = Pick<ResponseApi, 'posts'>
//    try {
//       const { data } = await apiTwitter.get<PostsRes>(`${apiURL}/posts/user/${userId}`)
//       return data
//    } catch {
//       throw new Error('Error in getPostByUser')
//    }
// }
