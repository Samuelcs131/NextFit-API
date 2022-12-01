import { Request, Response } from 'express'
import { Muscle } from '@prisma/client'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'
import * as MuscleService from '@services/prisma/muscle.service'

export const createMuscle = async (req: Request, res: Response) => {
  const { name, member }: Muscle = req.body

  if (verifyString([name, member])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    data: {
      name: name.trim(),
      member: member.trim()
    }
  }

  const [error, muscles] = await MuscleService.create(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(200).send(muscles)
}
