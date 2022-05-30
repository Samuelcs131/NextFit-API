import express, { Request, Response } from 'express'
// import { PrismaClient } from '@prisma/client'
// import { iGetParams } from 'src/@types/endpoints'
import clc from 'cli-color'

const TreiningController = express.Router()
// const prisma = new PrismaClient()

// GET
TreiningController.get('/', async (req: Request, res: Response) => {
  try {
    // RETURN
    console.log(clc.blue('[Pesquisa realizada!]'))
    res.status(200).send('users')

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
})

// POST
TreiningController.post('/', async (req, res) => {
  try {
    // RETURN
    console.log(clc.green('[Usuário Cadastrado!]'))
    return res.status(200).send('')

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
})

// PUT
TreiningController.put('/', (req, res) => {
  res.send('alguma coisa')
})

// DELETE
TreiningController.delete('/:id', (req, res) => {
  // const { id } = req.params.id

  res.send('alguma coisa')
})

export default TreiningController
