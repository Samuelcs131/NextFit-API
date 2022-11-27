import 'dotenv/config'
import express from 'express'
import clc from 'cli-color'
import routes from '@routes/router'
import corsConfig from '@config/cors'
import cors from 'cors'
import path from 'path'
import { env } from '@config/envVariables'

const app = express()

// CONFIG MIDDLEWARE
app.use(cors(corsConfig))
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTERS
app.use('/', routes)

// RUNNING SERVER
app.listen(env().port, () => {
  return console.log(`🚀 ${clc.cyan('[NextFit]')} Servidor rodando em http://localhost:${env().port} 🚀`)
})
