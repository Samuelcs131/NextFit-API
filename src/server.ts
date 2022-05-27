import express from 'express'
import clc from 'cli-color'
import router from '@routes/endpoints'
const app = express()

// VARIABLES
require('dotenv').config()

// VARIABLES
const PORT = process.env.PORT

// ROUTER
app.use('/', router)

app.listen(process.env.PORT, () => {
  return console.log(`🚀 ${clc.cyan('[NextFit]')} Servidor rodando em http://localhost:${PORT} 🚀`)
})
