import { Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const jwtKey = process.env.JWT_SECRET as string

const authRouter = Router()
const prisma = new PrismaClient()

authRouter.post('/register', async (req: Request, res: Response) => {
   const { email, password, username } = req.body
   const hashedPassword = await hash(password, 10)

   const newUser = await prisma.users.create({
      data: {
         username,
         email,
         hashedPassword,
      },
   })

   res.status(201).send({ data: newUser, msg: 'Register success' })
})

authRouter.post('/login', async (req, res) => {
   const { username, password } = req.body

   try {
      const user = await prisma.users.findFirst({
         where: {
            name: username,
         },
      })

      if (!user) res.status(404).send('Invalid credentials')

      const passwordMatch = false //await compare(password, user.password)

      if (!passwordMatch) res.status(404).send('Password do not match')

      const token = 'hola' //sign({ userId: user.id }, jwtKey, { expiresIn: '3h' })

      res.status(200).send({ data: { user, token }, msg: 'Login success' })
   } catch (error) {
      res.status(404).send(error)
   }
})

export default authRouter
