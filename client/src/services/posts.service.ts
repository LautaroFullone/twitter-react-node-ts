import { CreatePostForm, Post } from '../models/Post'
import { apiTwitter } from '../lib/axios'
import { User } from '../models'

const apiURL = 'http://localhost:3040'

interface ResponseApi {
   post: Post
   posts: Post[]
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

export async function createPost(postData: CreatePostForm) {
   try {
      type Res = Pick<ResponseApi, 'post' | 'message'>
      const { data } = await apiTwitter.post<Res>(`/posts`, postData)

      return data
   } catch {
      throw new Error('Error in createPost')
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
