import { Request, Response } from 'express'
import { Muscles } from '@prisma/client'
import { statusCode } from '@utils/status'
import { verifyString } from '@utils/verifications/valid'
import * as MusclesService from '@services/prisma/muscles.service'

export const createMuscle = async (req: Request, res: Response) => {
  const { name, members }: Muscles = req.body

  if (verifyString([name, members])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    data: {
      name: name.trim(),
      members: members.trim()
    }
  }

  const [error, muscles] = await MusclesService.create(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(200).send(muscles)
}
