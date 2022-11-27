import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import * as MusclesService from '@services/prisma/muscles.service'

export const deleteOnlyMuscle = async (req: Request, res: Response) => {
  const muscleId: string = req.params.id

  const args = {
    where: { id: muscleId }
  }

  const [error] = await MusclesService.exclude(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(204)
}
