import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'
import env from '@config/variables'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization

  if (!authorization || verifyString([authorization])) {
    return res.status(401).send(statusCode({ status: 401 }))
  }

  verify(authorization, env.production.secret, (error, decoded: any) => {
    if (error) {
      return res.status(403).send(statusCode({ status: 403, error: error.message }))
    }

    req.body.userAuthId = decoded.id
    return next()
  })
}
