import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'
import * as BodyMeasurementsService from '@services/prisma/bodyMeasurements.service'

export const getAllBodyMeasurements = async (req: Request, res: Response) => {
  const [error, bodyMeasurements] = await BodyMeasurementsService.findMany()

  if (error) {
    res.status(404).send(statusCode({ status: 404, error: error.meta?.message }))
  }

  res.status(200).send(bodyMeasurements)
}

export const getBodyMeasurementById = async (req: Request, res: Response) => {
  const measurementId: string = req.params.id

  if (verifyString([measurementId])) {
    res.status(400).send(statusCode({ status: 400 }))
  }

  const args = {
    where: { id: measurementId }
  }

  const [error, bodymeasurement] = await BodyMeasurementsService.findUnique(args)

  if (error) {
    res.status(404).send(statusCode({ status: 404, error: error.meta?.message }))
  }

  res.status(200).send(bodymeasurement)
}

export const getAllBodyMeasurementsByIdUser = async (req: Request, res: Response) => {
  const userId: string = req.params.id
  const userAuthId: string = req.body.userAuthId

  if (verifyString([userId, userAuthId])) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  if (userAuthId !== userId) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const args = {
    where: { userId }
  }

  const [error, bodyMeasurements] = await BodyMeasurementsService.findMany(args)

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(bodyMeasurements)
}
