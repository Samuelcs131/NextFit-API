import { Request, Response } from 'express'
import { Training } from '@prisma/client'
import { $date, reverseDateFormat } from '@utils/date/date-functions'
import { verifyNumber, verifyString } from 'src/validators/valid'
import { statusCode } from '@utils/status'
import * as TrainingsService from '@services/prisma/training.service'

export const createTraining = async (req: Request, res: Response) => {
  const userId: string = req.params.id
  const { exerciseId, weight, series, interval, repetitions }: Training = req.body
  const date: string = $date(reverseDateFormat(req.body.date || ''), true).format()

  if (
    verifyString([exerciseId]) ||
    verifyNumber([weight, series, interval, repetitions]) ||
    !$date(date, true).isValid() ||
    repetitions > 99
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    data: {
      exerciseId: exerciseId.trim(),
      userId: userId.trim(),
      weight,
      repetitions,
      series,
      date,
      interval,
      createAt: $date().format()
    }
  }

  const [error, training] = await TrainingsService.create(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  return res.status(200).send(training)
}
