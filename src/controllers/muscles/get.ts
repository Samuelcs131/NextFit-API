import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import * as MuscleService from '@services/prisma/muscle.service'

export const getAllMuscles = async (req: Request, res: Response) => {
  const [error, muscles] = await MuscleService.findMany()

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(muscles)
}

export const getMuscleById = async (req: Request, res: Response) => {
  const muscleId: string = req.params.id

  const args = { where: { id: muscleId } }

  const [error, muscles] = await MuscleService.findFirst(args)

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(muscles)
}
