import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify, TokenExpiredError } from 'jsonwebtoken'
import prisma from '../prismaClient'
import { Users } from '@prisma/client'

const jwtSecret = process.env.JWT_SECRET as string

export interface UserReq extends Request {
   user?: Users
}

export function requireAuth(req: UserReq, res: Response, next: NextFunction) {
   const token = req.headers.authorization?.split(' ')[1]

   if (!token) return res.status(401).send('Token not found')

   verify(token, jwtSecret, async (error, payload) => {
      if (error) {
         if (error instanceof TokenExpiredError) {
            return res.status(403).send('Token expired')
         }
         return res.status(403).send('Token invalid')
      }

      const { userId } = payload as JwtPayload

      const data = (await prisma.users.findUnique({ where: { id: userId } })) as Users

      req.user = data
      next()
   })
}
