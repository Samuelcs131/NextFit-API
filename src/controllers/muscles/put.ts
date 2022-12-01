import { Request, Response } from 'express'
import { Muscle } from '@prisma/client'
import * as MuscleService from '@services/prisma/muscle.service'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'

export const updateMuscle = async (req: Request, res: Response) => {
  const { name, member }: Muscle = req.body
  const muscleId: string = req.params.id

  if (verifyString([name, member, muscleId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: muscleId },
    data: {
      name: name.trim(),
      member: member.trim()
    }
  }

  const [error] = await MuscleService.update(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(200).send()
}
