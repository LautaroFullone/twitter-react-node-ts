import { Request, Response, Router } from 'express'
import { requireAuth } from '../middlewares'
import { UserReq } from '../middlewares/requireAuth'
import prisma from '../prismaClient'

const usersRouter = Router()

usersRouter.patch('/edit', requireAuth, async (req: UserReq, res: Response) => {
   try {
      const { name, username, bio, profileImage, coverImage } = req.body
      console.log('edit:', req.user)

      const userUpdated = await prisma.users.update({
         where: { id: req.user?.id },
         data: { name, username, bio, profileImage, coverImage },
      })

      return res.status(200).send({ user: userUpdated })
   } catch (error) {
      return res.status(500).send(error)
   }
})

usersRouter.get('/', async (req: Request, res: Response) => {
   try {
      const users = await prisma.users.findMany({
         orderBy: {
            createdAt: 'desc',
         },
      })
      return res.status(200).send({ users })
   } catch (error) {
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
      return res.status(500).send(error)
   }
})

export default usersRouter
