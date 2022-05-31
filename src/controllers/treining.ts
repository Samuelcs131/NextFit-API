import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import clc from 'cli-color'

const TreiningController = express.Router()
const prisma = new PrismaClient()

// GET
TreiningController.get('/', async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const training = await prisma.training.findMany()

    // RETURN
    console.log(clc.blue('[Pesquisa realizada!]'))
    res.status(200).send({ training })

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
})

// POST
TreiningController.post('/:id', async (req, res) => {
  try {
    // PARAMS
    const { name, weight, series } = req.body
    const userId: string = req.params.id
    const Repetitions: Array<number> = req.body.repetitions
    const date: string = req.body.date.split('-').reverse().join('-')

    // DATE NOW
    const dateNow: string = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format().split('/').reverse().join('-')

    // REGISTER TREINING
    const training = await prisma.training.create({
      data: {
        name: String(name),
        userId: String(userId),
        weight: Number(weight),
        repetitions: Repetitions,
        series: Number(series),
        data: new Date(date),
        createAt: new Date(dateNow)
      }
    })

    // RETURN
    console.log(clc.green('[Treino cadastrado!]'))
    return res.status(200).send({ training })

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
})

// PATCH
TreiningController.patch('/:id', async (req, res) => {
  try {
    // PARAMS
    const { name, weight, series } = req.body
    const treiningId: string = req.params.id
    const Repetitions: Array<number> = req.body.repetitions
    const date: string = req.body.date.split('-').reverse().join('-')

    // REGISTER MEASUREMENTS
    await prisma.training.update({
      where: { id: treiningId },
      data: {
        name: String(name),
        weight: Number(weight),
        repetitions: Repetitions,
        series: Number(series),
        data: new Date(date)
      }
    })

    // RETURN
    console.log(clc.green('[Medida atualizada!]'))
    return res.status(200).send('Medida atualizada!')

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
})

// DELETE
TreiningController.delete('/:id', async (req, res) => {
  try {
    // PARAMS
    const treiningId: string = req.params.id

    // REGISTER MEASUREMENTS
    await prisma.training.delete({
      where: { id: treiningId }
    })

    // RETURN
    console.log(clc.green('[Treino excluido!]'))
    return res.status(200).send('Treino excluido!')

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
})

export default TreiningController
