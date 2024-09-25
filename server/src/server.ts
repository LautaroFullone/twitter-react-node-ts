import express, { Request, Response } from 'express'
import cors from 'cors'
import { authRouter } from '../routes'

const PORT = process.env.PORT || 3040
const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)

app.get('/', (req: Request, res: Response) => {
   res.send('server working!')
})

app.listen(PORT, () => {
   console.log(`Server listening on port: ${PORT}`)
})
