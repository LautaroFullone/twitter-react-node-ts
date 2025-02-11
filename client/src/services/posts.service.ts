import { Comment, CreatePostForm, Post, CreateCommentForm } from '../models/Post'
import { apiTwitter } from '../lib/axios'
import { User } from '../models/User'

const apiURL = 'http://localhost:3040'

interface ResponseApi {
   post: Post
   posts: Post[]
   comment: Comment
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

export async function getPostById(postId: Post['id']) {
   type PostsRes = Pick<ResponseApi, 'post'>
   try {
      const { data } = await apiTwitter.get<PostsRes>(`${apiURL}/posts/${postId}`)
      return data
   } catch {
      throw new Error('Error in getPostById')
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

export async function likePost(postId: Post['id']) {
   type UsersRes = Pick<ResponseApi, 'post' | 'message'>
   try {
      const { data } = await apiTwitter.post<UsersRes>(`${apiURL}/posts/${postId}/like`)
      return data
   } catch {
      throw new Error('Error in likePost')
   }
}

export async function dislikePost(postId: Post['id']) {
   type UsersRes = Pick<ResponseApi, 'post' | 'message'>
   try {
      const { data } = await apiTwitter.post<UsersRes>(`${apiURL}/posts/${postId}/dislike`)
      return data
   } catch {
      throw new Error('Error in dislikePost')
   }
}

export async function commentPost({
   postId,
   commentBody,
}: {
   postId: Post['id']
   commentBody: CreateCommentForm
}) {
   type UsersRes = Pick<ResponseApi, 'comment' | 'message'>
   try {
      const { data } = await apiTwitter.post<UsersRes>(
         `${apiURL}/posts/${postId}/comment`,
         commentBody
      )
      return data
   } catch {
      throw new Error('Error in commentPost')
   }
}
