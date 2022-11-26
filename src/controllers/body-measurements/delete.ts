import { Request, Response } from 'express'
import { verifyString } from '@utils/verifications/valid'
import { statusCode } from '@utils/status'
import * as BodyMeasurements from '@services/prisma/bodyMeasurements'

export const deleteMeasurement = async (req: Request, res: Response) => {
  const measurementsId: string = req.params.id
  const userAuthId: string = req.body.userAuthId
  const userId: string = req.body.userId

  if (verifyString([measurementsId, userAuthId, userId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  if (userAuthId !== userId) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const args = {
    where: { id: measurementsId }
  }

  const [error] = await BodyMeasurements.exclude(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  return res.status(204)
}
