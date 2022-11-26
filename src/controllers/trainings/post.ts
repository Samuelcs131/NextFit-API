import { Request, Response } from 'express'
import { Training } from '@prisma/client'
import { $date, reverseDateFormat } from 'src/utils/date/date-functions'
import { verifyArray, verifyNumber, verifyString } from 'src/utils/verifications/valid'
import { statusCode } from 'src/utils/status'
import * as TrainingsService from '@services/prisma/trainings'

export const createTraining = async (req: Request, res: Response) => {
  const userId: string = req.params.id
  const { exercisesId, weight, series, interval }: Training = req.body
  const repetitions: Array<number> = req.body.repetitions
  const date: string = $date(reverseDateFormat(req.body.date || ''), true).format()

  if (
    verifyString([exercisesId]) ||
    verifyNumber([weight, series, interval]) ||
    !$date(date, true).isValid() ||
    verifyArray(repetitions, 'number') ||
    repetitions.length !== series ||
    repetitions.length > 10 ||
    repetitions.some((value: number) => value > 99)
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    data: {
      exercisesId: exercisesId.trim(),
      userId: userId.trim(),
      weight,
      repetitions,
      series,
      date,
      interval,
      createAt: $date().format()
    }
  }

  const [error] = await TrainingsService.create(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(204)
}
