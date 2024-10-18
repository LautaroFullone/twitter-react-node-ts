import { login, register, authenticatedUser } from './auth.service'
import {
   getUserById,
   getUsers,
   editUser,
   followUser,
   unfollowUser,
   getUserNotifications,
} from './users.service'
import {
   getPosts,
   getPostById,
   getPostByUser,
   createPost,
   likePost,
   dislikePost,
   commentPost,
} from './posts.service'

export {
   login,
   register,
   authenticatedUser,
   getUserById,
   getUsers,
   editUser,
   getPosts,
   getPostById,
   getPostByUser,
   createPost,
   followUser,
   unfollowUser,
   likePost,
   dislikePost,
   commentPost,
   getUserNotifications,
}
