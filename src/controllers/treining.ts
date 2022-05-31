import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import clc from 'cli-color'

const prisma = new PrismaClient()

// GET
export const index = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const training = await prisma.training.findMany()

    // RETURN
    console.log(clc.blue('[Pesquisa realizada!]'))
    res.status(200).send(training)

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
}

// GET
export const singleTreining = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idTreining: string = String(req.params.id)

    // SEARCH USERS
    const training = await prisma.training.findUnique({
      where: { id: idTreining }
    })

    // RETURN
    console.log(clc.blue('[Pesquisa realizada!]'))
    res.status(200).send(training)

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
}

// POST
export const create = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { name, weight, series, interval } = req.body
    const userId: string = req.params.id
    const Repetitions: Array<number> = req.body.repetitions
    const date: string = req.body.date.split('-').reverse().join('-')
    const inputs = [name, weight, series, date, Repetitions, interval]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        console.log(clc.bgRed('Erro: Preencha todos os campos!'))
        return res.status(400).send('Erro: Preencha todos os campos!')
      }
    }

    for (let num = 0; num < Repetitions.length; num++) {
      if (typeof Repetitions[num] === 'string') {
        console.log(clc.bgRed('Erro: Só seram aceitas repetições em formato de númerico!'))
        return res.status(400).send('Erro: Só seram aceitas repetições em formato de númerico!')
      }
    }

    if (Repetitions.length !== series) {
      console.log(clc.bgRed('Erro: O número de repetições não corresponde ao de serie!'))
      return res.status(400).send('Erro: O número de repetições nao corresponde ao de serie!')
    }

    // DATE NOW
    const dateNow: string = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format().split('/').reverse().join('-')

    // REGISTER TREINING
    const training = await prisma.training.create({
      data: {
        name: String(name.trim()),
        userId: String(userId),
        weight: Number(weight),
        repetitions: Repetitions,
        series: Number(series),
        data: new Date(date),
        interval: Number(interval),
        createAt: new Date(dateNow)
      }
    })

    // RETURN
    console.log(clc.green('[Treino cadastrado!]'))
    return res.status(200).send({ training })

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(500).json({ status: error })
  }
}

// PATCH
export const update = async (req: Request, res: Response) => {
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
    return res.status(500).json({ status: error })
  }
}

// DELETE
export const exclude = async (req: Request, res: Response) => {
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
    return res.status(500).json({ status: error })
  }
}
