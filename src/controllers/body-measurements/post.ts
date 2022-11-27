import { Request, Response } from 'express'
import { BodyMeasurements } from '@prisma/client'
import { $date, reverseDateFormat } from '@utils/date/date-functions'
import { verifyNumber, verifyString } from '@utils/verifications/valid'
import { statusCode } from '@utils/status'
import * as BodyMeasurementsService from '@services/prisma/bodyMeasurements.service'

export const createMeasurement = async (req: Request, res: Response) => {
  const userId: string = req.body.userId
  const userAuthId: string = req.body.userAuthId
  const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight }: BodyMeasurements = req.body
  const date: string = $date(reverseDateFormat(req.body.date), true).format()

  if (
    verifyString([userId, userAuthId]) ||
    verifyNumber([abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight]) ||
    $date(date, true).isValid()
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  if (userAuthId !== userId) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const args = {
    data: {
      date,
      abdomen,
      breastplate,
      deltoid,
      gluteal,
      leftArm,
      leftCalf,
      leftForearm,
      leftThigh,
      rightArm,
      rightCalf,
      rightForearm,
      rightThigh,
      weight,
      createAt: $date().format(),
      userId: userId.trim()
    }
  }

  const [error] = await BodyMeasurementsService.create(args)

  if (error) {
    return res.status(422).send(statusCode({ status: 422 }))
  }

  return res.status(204)
}
