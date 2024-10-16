import { login, register, authenticatedUser } from './auth.service'
import { getUserById, getUsers, editUser, followUser, unfollowUser } from './users.service'
import { getPosts, getPostByUser, createPost } from './posts.service'

export {
   login,
   register,
   authenticatedUser,
   getUserById,
   getUsers,
   editUser,
   getPosts,
   getPostByUser,
   createPost,
   followUser,
   unfollowUser,
}
