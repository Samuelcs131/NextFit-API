import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import * as TrainingService from '@services/prisma/training.service'
import { verifyString } from 'src/validators/valid'

export const deleteTraining = async (req: Request, res: Response) => {
  const trainingId: string = req.params.id

  if (verifyString([trainingId])) {
    res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: trainingId }
  }

  const [error] = await TrainingService.exclude(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  return res.status(204).send()
}
