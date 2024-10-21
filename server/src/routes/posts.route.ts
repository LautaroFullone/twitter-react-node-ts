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

postsRouter.get('/:postId', async (req: Request, res: Response) => {
   const { postId } = req.params

   try {
      const post = await prisma.posts.findUnique({
         where: {
            id: postId,
         },
         include: {
            user: true,
            comments: {
               include: {
                  user: true,
               },
               orderBy: {
                  createdAt: 'desc',
               },
            },
         },
      })

      return res.status(200).send({ post: post })
   } catch (error) {
      console.log('# error get post: ', error)
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

postsRouter.post('/:postId/like', requireAuth, async (req: UserReq, res: Response) => {
   const { postId } = req.params

   try {
      const post = await prisma.posts.findUnique({
         where: {
            id: postId,
         },
      })

      if (!post) throw new Error('Post to like not found')

      const actualLikeIds = post?.likedIds || []

      const postUpdated = await prisma.posts.update({
         where: { id: postId },
         data: {
            likedIds: [...actualLikeIds, req.user?.id!],
         },
      })

      if (req.user?.id !== post.userId) {
         await prisma.notifications.create({
            data: {
               body: `${req.user?.username} liked your tweet`,
               userId: post.userId,
            },
         })
      }

      return res.status(200).send({
         post: postUpdated,
         message: `Post like ${postUpdated.id}`,
      })
   } catch (error) {
      console.log('# error like post: ', error)
      return res.status(500).send(error)
   }
})

postsRouter.post('/:postId/dislike', requireAuth, async (req: UserReq, res: Response) => {
   const { postId } = req.params

   try {
      const post = await prisma.posts.findUnique({
         where: {
            id: postId,
         },
      })

      if (!post) throw new Error('Post to like not found')

      const actualLikeIds = post?.likedIds || []

      const postUpdated = await prisma.posts.update({
         where: { id: postId },
         data: {
            likedIds: [...actualLikeIds].filter((likeId) => likeId !== req.user?.id!),
         },
      })

      return res.status(200).send({
         post: postUpdated,
         message: `Post dislike ${postUpdated.id}`,
      })
   } catch (error) {
      console.log('# error dislike post: ', error)
      return res.status(500).send(error)
   }
})

postsRouter.post('/:postId/comment', requireAuth, async (req: UserReq, res: Response) => {
   const { postId } = req.params

   try {
      const newComment = await prisma.comments.create({
         data: {
            ...req.body,
            userId: req.user?.id,
            postId,
         },
      })

      return res.status(200).send({
         comment: newComment,
         message: `Comment created`,
      })
   } catch (error) {
      console.log('# error comment: ', error)
      return res.status(500).send(error)
   }
})

export default postsRouter
