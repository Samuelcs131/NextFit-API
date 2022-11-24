import { Request, Response } from 'express'
import { Exercises } from '@prisma/client'
import { statusCode } from 'src/utils/status'
import { verifyString } from 'src/utils/verifications/valid'
import * as ExercisesService from '@services/prisma/exercises'

export const updateExercises = async (req: Request, res: Response) => {
  const exercisesId: string = req.params.id
  const { name, muscleId, img }: Exercises = req.body

  if (verifyString([name, img, muscleId, exercisesId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: exercisesId },
    data: {
      name: name.trim(),
      muscleId: muscleId.trim(),
      img: img.trim()
    }
  }

  const [error, muscles] = await ExercisesService.update(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(200).send(muscles)
}
