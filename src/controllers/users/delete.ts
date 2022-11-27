import { Request, Response } from 'express'
import { statusCode } from '@utils/status'
import * as UsersService from '@services/prisma/users.service'
import * as BodyMeasurementsService from '@services/prisma/bodyMeasurements.service'
import * as TrainingsService from '@services/prisma/trainings.service'

export const deleteUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const userAuthId: string = req.body.userAuthId

  if (userAuthId !== userId) {
    return res.status(403).send(statusCode({ status: 403 }))
  }

  const trainingsPromisse = BodyMeasurementsService.deleteMany({
    where: { userId }
  })

  const bodyMeasurementsPromisse = TrainingsService.deleteMany({
    where: { userId }
  })

  const [trainingsError, bodyMeasurementsError] = await Promise.all([trainingsPromisse, bodyMeasurementsPromisse])

  if (trainingsError || bodyMeasurementsError) {
    return res.status(422).send(statusCode({ status: 422 }))
  }

  const [usersError] = await UsersService.exclude({
    where: { id: userId }
  })

  if (usersError) {
    return res.status(422).send(statusCode({ status: 422 }))
  }

  res.status(204)
}
