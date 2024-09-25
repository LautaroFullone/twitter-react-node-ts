import { Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const jwtKey = process.env.JWT_SECRET as string

const authRouter = Router()
const prisma = new PrismaClient()

authRouter.post('/register', async (req: Request, res: Response) => {
   const { email, password, name, username } = req.body
   const hashedPassword = await hash(password, 10)

   const newUser = await prisma.users.create({
      data: {
         name,
         username,
         email,
         hashedPassword,
      },
   })

   return res.status(201).send({ data: newUser, message: 'Register success' })
})

authRouter.post('/login', async (req: Request, res: Response) => {
   const { email, password } = req.body

   try {
      const user = await prisma.users.findFirst({
         where: {
            email,
         },
      })

      if (!user) return res.status(404).send('Invalid credentials')

      const passwordMatch = await compare(password, user.hashedPassword)

      if (!passwordMatch) return res.status(404).send('Password do not match')

      const token = sign({ userId: user.id }, jwtKey, { expiresIn: '3h' })

      return res
         .status(200)
         .send({ data: { user, token }, message: 'Login success' })
   } catch (error) {
      return res.status(500).send(error)
   }
})

export default authRouter
