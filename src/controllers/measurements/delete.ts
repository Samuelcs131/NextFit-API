import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'

const prisma = new PrismaClient()

// DELETE MEASUREMENT
export const deleteMeasurement = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idMeasurements: string = req.params.id
    const idUserAuth: string = req.body.idUserAuth
    const idUser: string = req.body.idUser

    // VERIFY AUTH
    if (idUserAuth !== idUser) {
      return res.status(401).send(status400('Usuário não autorizado!'))
    }

    // REGISTER MEASUREMENTS
    await prisma.bodyMeasurements.delete({
      where: { id: idMeasurements }
    })

    // RETURN
    status200('Medida excluida!')
    return res.status(204).send('Medida excluida!')

  // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}
