import { Request, Response } from 'express'
import { User } from '@prisma/client'
import { statusCode } from '@utils/status'
import { verifyEmail, verifyNumber, verifyString } from 'src/validators/valid'
import * as UsersService from '@services/prisma/user.service'

export const updateUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const userAuthId: string = req.body.userAuthId
  const { name, lastName, email, height, weight }: User = req.body

  if (userAuthId !== userId) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  if (
    verifyString([name, lastName, email]) ||
    verifyNumber([height, weight]) ||
    verifyEmail(email)
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: userId },
    data: {
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      weight,
      height
    }
  }

  const [error] = await UsersService.update(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  res.status(204).send()
}
