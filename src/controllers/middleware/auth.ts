import { status400 } from '@controllers/response/status'
import { NextFunction, Request, Response } from 'express'
import secret from '@config/secret'
import { verify } from 'jsonwebtoken'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send(status400('O token não foi informado!'))
  }

  // FORMATING TOKEN VERIFICATION
  const parts: any = authorization.split(' ')

  if (parts.length !== 2) {
    return res.status(401).send(status400('Erro no token!'))
  }

  const [schema, token] = parts

  if (!/^Bearer$/i.test(schema)) {
    return res.status(401).send(status400('Erro no formatado do token!'))
  }

  verify(token, secret, (error: any, decoded: any) => {
    if (error) {
      return res.status(401).send(status400('Token invalido!'))
    }

    req.body.idUserAuth = decoded.id
    return next()
  })
}
