import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'

/* eslint-disable-next-line */
import { generateTokenUser, varifyApiKey } from '../token/generateToken'

const prisma = new PrismaClient()

// FIND USERS
export const findUsers = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const usersData = await prisma.user.findMany()

    const users = usersData.map((user: User) => {
      return ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        height: user.height
      })
    })

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(users)

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FIND ONLY USER BY EMAIL
export const findOnlyUserByEmail = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const email: string = String(req.params.email.trim())
    /* const tokenAuthClientServer: string = req.headers.authclientserver as string

      // VERIFY AUTH
      const token: boolean = await varifyApiKey(tokenAuthClientServer)

      if (!token) {
        return res.status(401).send(status400('Token invalido, acesso negado!'))
      } */

    // VERIFY INPUT
    // eslint-disable-next-line
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
      return res.status(400).send(status400('Email invalido!'))
    }

    // SEARCH USER
    try {
      const user: User | null = await prisma.user.findUnique({ where: { email } })

      if (user === undefined || user === null) {
        return res.status(400).send(status400('O ID fornecido é invalido!'))
      }

      // RETURN
      status200('Pesquisa realizada!')
      res.status(200).send({
        id: user?.id,
        name: user?.name,
        lastName: user?.lastName,
        email: user?.email,
        height: user?.height,
        passwordResetExpires: user?.passwordResetExpires,
        passwordResetToken: user?.passwordResetToken
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FIND USER BY TOKEN
export const findUserByToken = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const tokenAuthUser: string = req.body.idUserAuth

    // SEARCH USER
    try {
      const user: User | null = await prisma.user.findUnique({
        where: { id: tokenAuthUser }
      })

      // RETURN
      status200('Pesquisa realizada!')
      res.status(200).send({
        id: user?.id,
        name: user?.name,
        lastName: user?.lastName,
        email: user?.email,
        height: user?.height,
        weight: user?.weight,
        sex: user?.sex
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(status400('O ID fornecido é invalido!'))
    }

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
