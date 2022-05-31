import express from 'express'
import clc from 'cli-color'
import cors from 'cors'
import routes from '@routes/router'

const app = express()
require('dotenv').config()

// VARIABLES
const PORT = process.env.PORT

// CONFIG EXPRESS
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTERS
app.use('/', routes)

// RUNNING SERVER
app.listen(process.env.PORT, () => {
  return console.log(`🚀 ${clc.cyan('[NextFit]')} Servidor rodando em http://localhost:${PORT} 🚀`)
})
