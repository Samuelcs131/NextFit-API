import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'
import secret from '@config/secret'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization

  if (!authorization || verifyString([authorization])) {
    return res.status(401).send(statusCode({ status: 401 }))
  }

  verify(authorization, secret, (error, decoded: any) => {
    if (error) {
      return res.status(403).send(statusCode({ status: 403, error: error.message }))
    }

    req.body.userAuthId = decoded.id
    return next()
  })
}
