import { statusCode } from '@utils/status'
import { NextFunction, Request, Response } from 'express'

export async function errorMiddleware (error: Error, req: Request, res: Response, next: NextFunction) {
  if (error) {
    res.status(500).send(statusCode({ status: 500, error }))
  }
}
