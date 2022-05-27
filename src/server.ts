import express from 'express'

const app = express()

app.get('/', (req, res) => {
  return res.json({ menssage: 'Opa' })
})

app.listen(2000)
