import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import { verifyString } from 'src/validators/valid'
import * as BodyMeasurementService from '@services/prisma/bodyMeasurement.service'

export const getAllBodyMeasurements = async (req: Request, res: Response) => {
  const [error, bodyMeasurements] = await BodyMeasurementService.findMany()

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

  const [error, bodymeasurement] = await BodyMeasurementService.findUnique(args)

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

  const [error, bodyMeasurements] = await BodyMeasurementService.findMany(args)

  if (error) {
    return res.status(404).send(statusCode({ status: 404 }))
  }

  res.status(200).send(bodyMeasurements)
}
