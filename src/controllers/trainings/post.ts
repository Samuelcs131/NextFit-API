import { Request, Response } from 'express'
import { PrismaClient, Training } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'
import dateNow from '@resources/dateNow'

const prisma = new PrismaClient()

// CREATE TRAINING
export const createTraining = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { exercisesId, weight, series, interval }: Training = req.body
    const repetitions: string[] = req.body.repetitions
    const userId: string = req.params.id
    const date: string = req.body.date.split('-').reverse().join('-')
    const inputs = [weight, series, date, repetitions, interval]

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
        exercisesId: String(exercisesId),
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
