import express from 'express'

const router = express.Router()

// GET
router.get('/', (req, res) => {
  res.send('alguma coisa')
})

// POST
router.post('/', (req, res) => {
  res.send('alguma coisa')
})

// PUT
router.put('/', (req, res) => {
  res.send('alguma coisa')
})

// DELETE
router.delete('/', (req, res) => {
  res.send('alguma coisa')
})

export default router
