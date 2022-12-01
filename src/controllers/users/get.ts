import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import { verifyEmail, verifyString } from 'src/validators/valid'
import * as UserService from '@services/prisma/user.service'

export const getAllUsers = async (req: Request, res: Response) => {
  const [error, users] = await UserService.findMany()

  if (error) {
    return res.status(404).send(statusCode({ status: 404, error: error.meta?.message }))
  }

  const formated = users.map(user => {
    return ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      height: user.height
    })
  })

  res.status(200).send(formated)
}

export const getUserByEmail = async (req: Request, res: Response) => {
  const email: string = req.params.email

  if (verifyString([email]) || verifyEmail(email)) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const args = { where: { email: email.trim() } }

  const [error, user] = await UserService.findUnique(args)

  if (error || user === null) {
    return res.status(404).send(statusCode({ status: 404, error: error?.meta?.message }))
  }

  const formated = {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    height: user.height,
    passwordResetExpires: user.passwordResetExpires,
    passwordResetToken: user.passwordResetToken
  }

  return res.status(200).send(formated)
}

export const getUserByToken = async (req: Request, res: Response) => {
  const tokenAuthUser: string = req.body.userAuthId

  if (tokenAuthUser) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const args = {
    where: { id: tokenAuthUser }
  }

  const [error, users] = await UserService.findUnique(args)

  if (error) {
    return res.status(404).send(statusCode({ status: 404, error: error.meta?.message }))
  }

  const formated = {
    id: users?.id,
    name: users?.name,
    lastName: users?.lastName,
    email: users?.email,
    height: users?.height,
    weight: users?.weight,
    sex: users?.sex
  }

  res.status(200).send(formated)
}
