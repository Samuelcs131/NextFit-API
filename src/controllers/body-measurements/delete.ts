import { Request, Response } from 'express'
import { verifyString } from 'src/validators/valid'
import { statusCode } from '@utils/status'
import * as BodyMeasurementsService from '@services/prisma/bodyMeasurements.service'

export const deleteBodyMeasurement = async (req: Request, res: Response) => {
  const bodyMeasurementId: string = req.params.id
  const userAuthId: string = req.body.userAuthId
  const userId: string = req.body.userId

  if (verifyString([bodyMeasurementId, userAuthId, userId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  if (userAuthId !== userId) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const args = {
    where: { id: bodyMeasurementId }
  }

  const [error] = await BodyMeasurementsService.exclude(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422, error: error.meta?.message }))
  }

  return res.status(204)
}
