import { Request, Response } from 'express'
import { statusCode } from 'src/utils/status'
import * as TrainingsService from '@services/prisma/trainings'
import { verifyString } from 'src/utils/verifications/valid'

export const deleteTraining = async (req: Request, res: Response) => {
  const trainingId: string = req.params.id

  if (verifyString([trainingId])) {
    res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: trainingId }
  }

  const [error] = await TrainingsService.exclude(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(204)
}
