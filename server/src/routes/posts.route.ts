import { Request, Response, Router } from 'express'
import { requireAuth, UserReq } from '../middlewares/requireAuth'
import prisma from '../lib/prisma'

const postsRouter = Router()

postsRouter.get('/', async (req: Request, res: Response) => {
   try {
      const posts = await prisma.posts.findMany({
         include: {
            user: true,
            comments: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
      })

      return res.status(200).send({ posts })
   } catch (error) {
      return res.status(500).send(error)
   }
})

postsRouter.get('/user/:userId', async (req: Request, res: Response) => {
   const { userId } = req.params

   try {
      const posts = await prisma.posts.findMany({
         where: {
            userId: userId,
         },
         include: {
            user: true,
            comments: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
      })

      return res.status(200).send({ posts })
   } catch (error) {
      return res.status(500).send(error)
   }
})

postsRouter.post('/', requireAuth, async (req: UserReq, res: Response) => {
   try {
      const post = await prisma.posts.create({
         data: { ...req.body, userId: req.user?.id },
      })
      return res.status(200).send({ post, message: 'Post created' })
   } catch (error) {
      return res.status(500).send(error)
   }
})

export default postsRouter
