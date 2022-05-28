import express from 'express'
import clc from 'cli-color'
import router from '@routes/endpoints'
import cors from 'cors'

const app = express()
require('dotenv').config()

// VARIABLES
const PORT = process.env.PORT

// CONFIG EXPRESS
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTER
app.use('/', router)

app.listen(process.env.PORT, () => {
  return console.log(`🚀 ${clc.cyan('[NextFit]')} Servidor rodando em http://localhost:${PORT} 🚀`)
})
