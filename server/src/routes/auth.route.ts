import { requireAuth, UserReq } from '../middlewares/requireAuth'
import { Request, Response, Router } from 'express'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import prisma from '../prismaClient'

const jwtSecret = process.env.JWT_SECRET as string

const authRouter = Router()

authRouter.post('/register', async (req: Request, res: Response) => {
   try {
      const { email, password, name, username } = req.body
      const hashedPassword = await hash(password, 10)

      const newUser = await prisma.users.create({
         data: {
            name,
            username,
            email,
            password: hashedPassword,
         },
      })

      return res.status(201).send({ user: newUser, message: 'User registered' })
   } catch (error) {
      return res.status(500).send(error)
   }
})

authRouter.post('/login', async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body

      const user = await prisma.users.findFirst({
         where: {
            email,
         },
      })

      if (!user) {
         return res.status(404).send('Invalid credentials')
      }

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
         return res.status(404).send('Password do not match')
      }

      const token = sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' })

      return res.status(200).send({ user, token, message: 'Login success' })
   } catch (error) {
      return res.status(500).send(error)
   }
})

authRouter.get('/authenticated-user', requireAuth, async (req: UserReq, res: Response) => {
   try {
      console.log('GET /autenticated-user: ', req?.user)

      return res.status(200).send({ user: req.user })
   } catch (error: any) {
      console.log('ERROR /autenticated-user: ', error)
      if (error?.message) {
         return res.status(404).send({ error: error.message })
      }

      return res.status(500).send({ error: 'get autenticated user error' })
   }
})

export default authRouter
