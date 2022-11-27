import { statusCode } from '@utils/status'
import { Request, Response } from 'express'

export async function errorMiddleware (error: Error, req: Request, res: Response) {
  if (error) {
    res.status(500).send(statusCode({ status: 500, error: error.message }))
  }
}
