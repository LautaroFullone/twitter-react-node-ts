import { Request, Response, Router } from 'express'
import { requireAuth } from '../middlewares'
import { UserReq } from '../middlewares/requireAuth'
import prisma from '../lib/prisma'

const usersRouter = Router()

usersRouter.get('/', async (req: Request, res: Response) => {
   try {
      const users = await prisma.users.findMany({
         orderBy: {
            createdAt: 'desc',
         },
      })
      return res.status(200).send({ users })
   } catch (error) {
      console.log('# error get users: ', error)
      return res.status(500).send(error)
   }
})

usersRouter.get('/:userId', async (req: Request, res: Response) => {
   const { userId } = req.params

   try {
      const user = await prisma.users.findUnique({
         where: {
            id: userId,
         },
      })

      const followersCount = await prisma.users.count({
         where: {
            followingIds: {
               has: userId,
            },
         },
      })

      return res.status(200).send({ user: { ...user, followersCount } })
   } catch (error) {
      console.log('# error get user: ', error)
      return res.status(500).send(error)
   }
})

usersRouter.patch('/edit', requireAuth, async (req: UserReq, res: Response) => {
   try {
      const { name, username, bio, profileImage, coverImage } = req.body

      const userUpdated = await prisma.users.update({
         where: { id: req.user?.id },
         data: { name, username, bio, profileImage, coverImage },
      })

      return res.status(200).send({ user: userUpdated, message: 'User updated' })
   } catch (error) {
      console.log('# error edit user: ', error)
      return res.status(500).send(error)
   }
})

usersRouter.post('/follow/:userId', requireAuth, async (req: UserReq, res: Response) => {
   const { userId } = req.params

   try {
      const userToFollow = await prisma.users.findUnique({
         where: {
            id: userId,
         },
      })

      if (!userToFollow) throw new Error('User to follow not found')

      const actualFollowingIds = req.user?.followingIds || []

      const userUpdated = await prisma.users.update({
         where: { id: req.user?.id },
         data: { followingIds: [...actualFollowingIds, userId] },
      })

      await prisma.notifications.create({
         data: {
            body: `${req.user?.username} is now following you`,
            userId: userToFollow.id,
         },
      })

      return res.status(200).send({
         user: userUpdated,
         idUserProfile: userToFollow.id,
         message: `Following ${userToFollow.name}`,
      })
   } catch (error) {
      console.log('# error followUser: ', error)
      return res.status(500).send(error)
   }
})

usersRouter.post('/unfollow/:userId', requireAuth, async (req: UserReq, res: Response) => {
   const { userId } = req.params

   try {
      const userToUnfollow = await prisma.users.findUnique({
         where: {
            id: userId,
         },
      })

      if (!userToUnfollow) throw new Error('User to follow not found')

      const actualFollowingIds = req.user?.followingIds || []

      const userUpdated = await prisma.users.update({
         where: { id: req.user?.id },
         data: {
            followingIds: [...actualFollowingIds].filter(
               (followingId) => followingId !== userToUnfollow.id
            ),
         },
      })

      return res.status(200).send({
         user: userUpdated,
         idUserProfile: userToUnfollow.id,
         message: `Unfollowing ${userToUnfollow.name}`,
      })
   } catch (error) {
      console.log('# error unfollowUser: ', error)
      return res.status(500).send(error)
   }
})

usersRouter.get('/:userId/notifications', async (req: Request, res: Response) => {
   const { userId } = req.params

   try {
      const notifications = await prisma.notifications.findMany({
         where: {
            userId: userId,
         },
         orderBy: {
            createdAt: 'desc',
         },
      })

      await prisma.users.update({
         where: { id: userId },
         data: {
            hasNotification: false,
         },
      })

      return res.status(200).send({ notifications })
   } catch (error) {
      return res.status(500).send(error)
   }
})

export default usersRouter
