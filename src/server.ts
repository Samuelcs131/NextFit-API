import 'dotenv/config'
import express from 'express'
import clc from 'cli-color'
import routes from '@routes/router'
import corsConfig from '@config/cors'
import cors from 'cors'

const app = express()

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT

// CONFIG MIDDLEWARE
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTERS
app.use('/', routes)

// RUNNING SERVER
app.listen(process.env.PORT, () => {
  return console.log(`🚀 ${clc.cyan('[NextFit]')} Servidor rodando em http://localhost:${PORT} 🚀`)
})
