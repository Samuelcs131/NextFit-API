import { Request, Response } from 'express'
import { BodyMeasurements } from '@prisma/client'
import { statusCode } from '@utils/status'
import { verifyNumber, verifyString } from '@utils/verifications/valid'
import { $date, reverseDateFormat } from '@utils/date/date-functions'
import * as BodyMeasurementsService from '@services/prisma/bodyMeasurements'

export const updateMeasurement = async (req: Request, res: Response) => {
  const bodyMenasurementId: string = req.params.id
  const userId: string = req.body.userId
  const userAuthId = req.body.userAuthId
  const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight }: BodyMeasurements = req.body
  const date: string = $date(reverseDateFormat(req.body.date), true).format()

  if (
    verifyString([userId]) ||
    verifyNumber([abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight]) ||
    $date(date, true).isValid()
  ) {
    return res.status(400).send(statusCode({ status: 400 }))
  }

  if (userAuthId !== userId) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const args = {
    where: { id: bodyMenasurementId },
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
      weight
    }
  }

  const [error] = await BodyMeasurementsService.update(args)

  if (error) {
    res.status(422).send(statusCode({ status: 422 }))
  }

  res.status(204)
}
