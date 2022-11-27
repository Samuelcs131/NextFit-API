import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { generateTokenUser } from '../utils/token/generateToken'
import { verifyEmail, verifyString } from '@utils/verifications/valid'
import { statusCode } from '@utils/status'
import * as UsersService from '@services/prisma/users'

const auth = async (req: Request, res: Response) => {
  const email: string = req.body.email
  const password: string = req.body.password

  if (
    verifyString([password]) ||
      verifyEmail(email)
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const [userError, user] = await UsersService.findUnique({
    where: { email: email.trim() }
  })

  if (userError || user === null) {
    return res.status(404).send(statusCode({ status: 404, error: userError?.meta?.message }))
  }

  const comparePassword = await compare(password, user.password)

  if (comparePassword === false) {
    return res.status(401).send(statusCode({ status: 401 }))
  }

  const formated = {
    user: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      height: user.height,
      weight: user.weight,
      sex: user.sex
    },
    token: await generateTokenUser(user.id)
  }

  return res.status(200).send(formated)
}

export default auth
