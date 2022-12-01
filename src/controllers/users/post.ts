import { Request, Response } from 'express'
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { generateTokenUser } from '@utils/token/generateToken'
import { randomBytes } from 'crypto'
import { templateResetEmail } from '@resources/template/resetEmail'
import { statusCode } from '@utils/status'
import { verifyEmail, verifyNumber, verifyPassword, verifyString, verifyUserType, verifyUserSex } from 'src/validators/valid'
import { $date } from '@utils/date/date-functions'
import * as UserService from '@services/prisma/user.service'
import * as SendGridService from '@services/sendGrid/sendGrid.service'
import { env } from '@config/envVariables'

export const createUser = async (req: Request, res: Response) => {
  const { name, lastName, email, password, height, weight, sex, typeUser }: User = req.body

  if (
    verifyString([name, lastName, password]) ||
    verifyNumber([height, weight]) ||
    verifyEmail(email) ||
    verifyUserSex(sex) ||
    verifyPassword(password) ||
    verifyUserType(typeUser)
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const [verifyEmailError, verifyEmailExists] = await UserService.findMany({ where: { email } })

  if (verifyEmailError) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  if (verifyEmailExists.length !== 0) {
    return res.status(422).send(statusCode({ status: 422 }))
  }

  const hashedPassword: string = await hash(password, 10)

  const args = {
    data: {
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      typeUser,
      height,
      password: hashedPassword.trim(),
      sex,
      weight,
      passwordResetExpires: $date().format(),
      passwordResetToken: 'initial'
    }
  }

  const [error, user] = await UserService.create(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
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

export const forgotPassword = async (req: Request, res: Response) => {
  const email : string = req.body.email

  if (verifyEmail(email)) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const [error, user] = await UserService.findUnique({ where: { email } })

  if (!user || error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  if ($date().toDate() < user.passwordResetExpires) {
    return res.status(419).send(statusCode({ status: 419 }))
  }

  const [setApiKeyError] = await SendGridService.setApiKey(env().sendGrid)

  if (setApiKeyError) {
    return res.status(500).send(statusCode({ status: 500, error: setApiKeyError }))
  }

  const tokenResetPassword = randomBytes(20).toString('hex')

  const [sendError] = await SendGridService.send({
    from: 'samuelcs131@gmail.com',
    to: email,
    subject: 'Recupere sua senha | NextFit',
    html: templateResetEmail(user, tokenResetPassword)
  })

  if (sendError) {
    return res.status(500).send(statusCode({ status: 500, error }))
  }

  const [userUpdateError] = await UserService.update({
    where: { email },
    data: {
      passwordResetToken: tokenResetPassword,
      passwordResetExpires: $date().add(2, 'h').format()
    }
  })

  if (userUpdateError) {
    return res.status(422).send(statusCode({ status: 422 }))
  }

  res.status(204).send()
}

export const resetPassword = async (req: Request, res: Response) => {
  const passwordResetToken: string = req.body.resetToken
  const { email, password }: User = req.body

  if (
    verifyString([password]) ||
    verifyEmail(email) ||
    password.length < 6 || password.length > 16
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  const [userError, user] = await UserService.findFirst({ where: { email } })

  if (!user || userError) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  if (
    passwordResetToken !== user.passwordResetToken ||
    $date().toDate() > user.passwordResetExpires
  ) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const token: string = randomBytes(20).toString('hex')

  const hashedPassword: string = await hash(password, 10)

  const [userUpdateError] = await UserService.update({
    where: { email },
    data: {
      password: hashedPassword.trim(),
      passwordResetToken: token.trim()
    }
  })

  if (userUpdateError) {
    return res.status(422).send(statusCode({ status: 422 }))
  }

  res.status(204).send()
}
