import { Request, Response } from 'express'
import { Muscles } from '@prisma/client'
import * as MusclesService from '@services/prisma/muscles.service'
import { statusCode } from '@utils/status'
import { verifyString } from '@utils/verifications/valid'

export const updateMuscle = async (req: Request, res: Response) => {
  const { name, members }: Muscles = req.body
  const muscleId: string = req.params.id

  if (verifyString([name, members, muscleId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: muscleId },
    data: {
      name: name.trim(),
      members: members.trim()
    }
  }

  const [error, muscles] = await MusclesService.update(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(200).send(muscles)
}
