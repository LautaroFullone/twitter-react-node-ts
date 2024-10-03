import express, { Request, Response } from 'express'
import { authRouter, usersRouter } from './routes'
import cors from 'cors'

const PORT = process.env.PORT || 3040
const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.get('/', (req: Request, res: Response) => {
   res.send('server working!')
})

app.listen(PORT, () => {
   console.log(`Server listening on port: ${PORT}`)
})
