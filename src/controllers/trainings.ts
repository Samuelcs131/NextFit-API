import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from './response/status'
import dateNow from '@resources/dateNow'
import { iTreining } from 'src/@types/endpoints'

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
export const singleTraining = async (req: Request, res: Response) => {
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

// GET
export const userTrainings = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = String(req.params.id)

    try {
      // SEARCH USERS
      const training = await prisma.training.findMany({
        where: { userId: idUser }
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
    const { name, weight, series, interval }: iTreining = req.body
    const userId: string = req.params.id
    const repetitions: Array<string> = req.body.repetitions
    const date: string = req.body.date.split('-').reverse().join('-')
    const inputs = [name, weight, series, date, repetitions, interval]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    if (Array.isArray(repetitions) === false) {
      return res.status(400).send(status400('O campo repetições só pode ser definido como vetor!'))
    }

    for (let num = 0; num < repetitions.length; num++) {
      if (typeof repetitions[num] !== 'number') {
        return res.status(400).send(status400('Só seram aceitas repetições em formato de númerico!'))
      }
    }

    if (repetitions.length !== series) {
      return res.status(400).send(status400('O número de repetições não corresponde ao de serie!'))
    }

    // REGISTER TREINING
    await prisma.training.create({
      data: {
        name: name.trim(),
        userId: String(userId),
        weight,
        repetitions,
        series,
        data: new Date(date),
        interval,
        createAt: dateNow
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
    const { name, weight, series, interval }: iTreining = req.body
    const trainingId: string = req.params.id
    const repetitions: Array<number> = req.body.repetitions
    const date: string = req.body.date.split('-').reverse().join('-')
    const inputs = [name, weight, series, trainingId, repetitions, date]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    if (Array.isArray(repetitions) === false) {
      return res.status(400).send(status400('O campo repetições só pode ser definido como vetor!'))
    }

    for (let num = 0; num < repetitions.length; num++) {
      if (typeof repetitions[num] !== 'number') {
        return res.status(400).send(status400('Só seram aceitas repetições em formato de númerico!'))
      }
    }

    if (repetitions.length !== series) {
      return res.status(400).send(status400('O número de repetições não corresponde ao de serie!'))
    }

    try {
      // REGISTER TRAINING
      await prisma.training.update({
        where: { id: trainingId },
        data: {
          name: name.trim(),
          weight,
          repetitions,
          series,
          interval,
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
