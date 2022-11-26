import { Request, Response } from 'express'
import { statusCode } from 'src/utils/status'
import * as MusclesService from '@services/prisma/muscles'

export const getAllMuscles = async (req: Request, res: Response) => {
  const [error, muscles] = await MusclesService.findMany()

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(muscles)
}

export const getMuscleById = async (req: Request, res: Response) => {
  const muscleId: string = req.params.id

  const args = { where: { id: muscleId } }

  const [error, muscles] = await MusclesService.findFirst(args)

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(muscles)
}
