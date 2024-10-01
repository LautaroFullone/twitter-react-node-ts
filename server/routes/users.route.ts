import { PrismaClient } from '@prisma/client'
import { Request, Response, Router } from 'express'

const usersRouter = Router()
const prisma = new PrismaClient()

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
