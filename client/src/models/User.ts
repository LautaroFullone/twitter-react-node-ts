export interface User {
   id: string
   name: string
   username: string
   bio: string
   email: string
   emailVerified: string
   image: string
   coverImage: string
   profileImage: string
   password: string
   createdAt: string
   updatedAt: string
   followingIds: string[]
   hasNotification: boolean
}

export type UserRegisterForm = Pick<User, 'name' | 'username' | 'email' | 'password'>

export type UserLoginForm = Pick<User, 'email' | 'password'>

export type UserEditForm = Pick<User, 'name' | 'username' | 'bio' | 'profileImage' | 'coverImage'>
