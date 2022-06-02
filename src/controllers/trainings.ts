import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from './response/status'

const prisma = new PrismaClient()

// GET
export const index = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const training = await prisma.training.findMany()

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(training)

    // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}

// GET
export const singleTreining = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idTreining: string = String(req.params.id)

    try {
      // SEARCH USERS
      const training = await prisma.training.findUnique({
        where: { id: idTreining }
      })

      // RETURN
      status200('Pesquisa realizada!')
      res.status(200).send(training)

      // ERROR!
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}

// POST
export const create = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { name, weight, series, interval } = req.body
    const userId: string = req.params.id
    const Repetitions: Array<string> = req.body.repetitions
    const date: string = req.body.date.split('-').reverse().join('-')
    const inputs = [name, weight, series, date, Repetitions, interval]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    if (Array.isArray(Repetitions) === false) {
      return res.status(400).send(status400('O campo repetições só pode ser definido como vetor!'))
    }

    for (let num = 0; num < Repetitions.length; num++) {
      if (typeof Repetitions[num] !== 'number') {
        return res.status(400).send(status400('Só seram aceitas repetições em formato de númerico!'))
      }
    }

    if (Repetitions.length !== series) {
      return res.status(400).send(status400('O número de repetições não corresponde ao de serie!'))
    }

    // DATE NOW
    const dateNow: string = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format().split('/').reverse().join('-')

    // REGISTER TREINING
    await prisma.training.create({
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
    status200('Treino cadastrado!')
    return res.status(204).send('Treino cadastrado!')

  // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}

// PATCH
export const update = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { name, weight, series, interval } = req.body
    const trainingId: string = req.params.id
    const Repetitions: Array<number> = req.body.repetitions
    const date: string = req.body.date.split('-').reverse().join('-')
    const inputs = [name, weight, series, trainingId, Repetitions, date]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    if (Array.isArray(Repetitions) === false) {
      return res.status(400).send(status400('O campo repetições só pode ser definido como vetor!'))
    }

    for (let num = 0; num < Repetitions.length; num++) {
      if (typeof Repetitions[num] !== 'number') {
        return res.status(400).send(status400('Só seram aceitas repetições em formato de númerico!'))
      }
    }

    if (Repetitions.length !== series) {
      return res.status(400).send(status400('O número de repetições não corresponde ao de serie!'))
    }

    try {
      // REGISTER TRAINING
      await prisma.training.update({
        where: { id: trainingId },
        data: {
          name: String(name.trim()),
          weight: Number(weight),
          repetitions: Repetitions,
          series: Number(series),
          interval: Number(interval),
          data: new Date(date)
        }
      })

      // RETURN
      status200('Medida atualizada!')
      return res.status(204).send('Medida atualizada!')

    // ERRO!
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('Treino inexistente!'))
    }

  // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}

// DELETE
export const exclude = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const trainingId: string = req.params.id

    // REGISTER TRAINING
    await prisma.training.delete({
      where: { id: trainingId }
    })

    // RETURN
    status200('Treino excluido!')
    return res.status(204).send('Treino excluido!')

  // ERROR!
  } catch (error) {
    return res.status(500).send(status500(error))
  }
}
