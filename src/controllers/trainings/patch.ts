import { Request, Response } from 'express'
import { PrismaClient, Training } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'

const prisma = new PrismaClient()

// PATCH TRAINING
export const updateTraining = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const { weight, series, interval, exercisesId }: Training = req.body.body || req.body
    const trainingId: string = req.params.id
    const repetitions: Array<number> = req.body.body.repetitions || req.body.repetitions
    const date: string = (req.body.body.date || req.body.date).split('-').reverse().join('-')
    const inputs = [weight, series, trainingId, repetitions, date]

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
          exercisesId: String(exercisesId).trim(),
          weight: Number(weight),
          repetitions,
          series: Number(series),
          interval: Number(interval),
          date: new Date(date)
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
