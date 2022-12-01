import { Request, Response } from 'express'
import { Exercise } from '@prisma/client'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'
import * as ExerciseService from '@services/prisma/exercise.service'

export const updateExercise = async (req: Request, res: Response) => {
  const exerciseId: string = req.params.id
  const { name, muscleId, img }: Exercise = req.body

  if (verifyString([name, img, muscleId, exerciseId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: exerciseId },
    data: {
      name: name.trim(),
      muscleId: muscleId.trim(),
      img: img.trim()
    }
  }

  const [error] = await ExerciseService.update(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(200).send()
}
