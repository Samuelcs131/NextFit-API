import { status400 } from '@controllers/response/status'
import { NextFunction, Request, Response } from 'express'
import secret from '@config/secret'
import { verify } from 'jsonwebtoken'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization: string = req.headers.authorization as string

  if (!authorization) {
    return res.status(401).send(status400('O token não foi informado!'))
  }

  verify(authorization, secret, (error: any, decoded: any) => {
    if (error) {
      return res.status(401).send(status400('Token invalido!'))
    }

    req.body.idUserAuth = decoded.id
    return next()
  })
}
