import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET as string

export function requireAuth(req: Request, res: Response, next: NextFunction) {
   const tokenHeader = req.headers.authorization

   if (!tokenHeader) return res.status(401).send('Token not found')

   const token = tokenHeader.split(' ')[1]

   if (!token) return res.status(401).send('Unauthorized')

   verify(tokenHeader, jwtSecret, (error, user) => {
      if (error) return res.status(403).send('Forbidden')

      req.user = user
      next()
   })
}
