import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'

const prisma = new PrismaClient()

// FIND MEASUREMENTS
export const findMeasurements = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const measurements = await prisma.bodyMeasurements.findMany()

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(measurements)

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FIND ONLY MEASUREMENT
export const findOnlyMeasurement = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idMeasurements: string = req.params.id

    // SEARCH USERS
    const measurements = await prisma.bodyMeasurements.findUnique({
      where: { id: idMeasurements }
    })

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(measurements)

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FIND MEASUREMENTS BY ID USER
export const findMeasurementsByIdUser = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = req.params.id
    const idUserAuth: string = req.body.idUserAuth

    // VERIFY AUTH
    if (idUserAuth !== idUser) {
      return res.status(401).send(status400('Usuário não autorizado!'))
    }

    // SEARCH USERS
    const measurements = await prisma.bodyMeasurements.findMany({
      where: { userId: idUser }
    })

    // RETURN
    status200('Pesquisa realizada!')
    res.status(200).send(measurements)

    // ERROR!
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
