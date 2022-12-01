import { Request, Response } from 'express'
import { Exercise } from '@prisma/client'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'
import * as ExerciseService from '@services/prisma/exercise.service'

export const createExercise = async (req: Request, res: Response) => {
  const { name, img, muscleId }: Exercise = req.body

  if (verifyString([name, img, muscleId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    data: {
      name: name.trim(),
      img: img.trim(),
      muscleId: muscleId.trim()
    }
  }

  const [error, muscles] = await ExerciseService.create(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(200).send(muscles)
}
