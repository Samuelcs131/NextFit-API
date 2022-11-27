import { Request, Response } from 'express'
import { Training } from '@prisma/client'
import { verifyArray, verifyNumber, verifyString } from '@utils/verifications/valid'
import { statusCode } from '@utils/status'
import { $date, reverseDateFormat } from '@utils/date/date-functions'
import * as TrainingsService from '@services/prisma/trainings.service'

export const updateTraining = async (req: Request, res: Response) => {
  const trainingId: string = req.params.id
  const { weight, series, interval, exercisesId }: Training = req.body
  const repetitions: Array<number> = req.body.repetitions
  const date = $date(reverseDateFormat(req.body.date || ''), true).format()

  if (
    verifyString([exercisesId, trainingId]) ||
    verifyNumber([weight, series, interval]) ||
    !$date(date, true).isValid() ||
    verifyArray(repetitions, 'number') ||
    repetitions.length !== series
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: trainingId },
    data: {
      exercisesId: exercisesId.trim(),
      weight,
      repetitions,
      series,
      interval,
      date: new Date(date)
    }
  }

  const [error] = await TrainingsService.update(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(204)
}
