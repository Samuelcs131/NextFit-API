import express, { Request, Response } from 'express'
import UserController from '@controllers/user'
import TreiningController from '@controllers/treining'
import BodyMeasurementsController from '@controllers/bodyMeasurements'
import clc from 'cli-color'
import cors from 'cors'

const app = express()
require('dotenv').config()

// VARIABLES
const PORT = process.env.PORT

// CONFIG EXPRESS
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTERS
app.get('/', (req: Request, res: Response) => {
  res.send('Opa')
})

app.use('/user', UserController)
app.use('/treining', TreiningController)
app.use('/bodyMeasurements', BodyMeasurementsController)

// RUNNING SERVER
app.listen(process.env.PORT, () => {
  return console.log(`🚀 ${clc.cyan('[NextFit]')} Servidor rodando em http://localhost:${PORT} 🚀`)
})
