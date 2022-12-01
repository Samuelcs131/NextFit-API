import { Request, Response } from 'express'
import { Training } from '@prisma/client'
import { verifyNumber, verifyString } from 'src/validators/valid'
import { statusCode } from '@utils/status'
import { $date, reverseDateFormat } from '@utils/date/date-functions'
import * as TrainingsService from '@services/prisma/training.service'

export const updateTraining = async (req: Request, res: Response) => {
  const trainingId: string = req.params.id
  const { weight, series, interval, exerciseId, repetitions }: Training = req.body
  const date = $date(reverseDateFormat(req.body.date || ''), true).format()

  if (
    verifyString([exerciseId, trainingId]) ||
    verifyNumber([weight, series, interval, repetitions]) ||
    !$date(date, true).isValid() ||
    repetitions > 99
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: trainingId },
    data: {
      exerciseId: exerciseId.trim(),
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

  res.status(204).send()
}
