import { Request, Response } from 'express'
import { statusCode } from 'src/utils/status'
import * as ExercisesService from '@services/prisma/exercises'

export const deleteExercises = async (req: Request, res: Response) => {
  const idExercises: string = req.params.id

  const args = {
    where: { id: idExercises }
  }

  const [error] = await ExercisesService.exclude(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(204)
}
