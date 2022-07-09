import { Request, Response } from 'express'
import { BodyMeasurements, PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'
import dateNow from '@resources/dateNow'

const prisma = new PrismaClient()

// CREATE MEASUREMENT
export const createMeasurement = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = req.params.id
    const idUserAuth: string = req.body.idUserAuth
    const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight }: BodyMeasurements = req.body
    const inputs = [abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight]
    const date: string = req.body.date.split('-').reverse().join('-')

    // VERIFY AUTH
    if (idUserAuth !== idUser) {
      return res.status(401).send(status400('Usuário não autorizado!'))
    }

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (typeof inputs[num] === 'string') {
        return res.status(400).send(status400('Só seram aceitas medidas em formato de númerico!'))
      }

      if (inputs[num] === null || inputs[num] === undefined) {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    // REGISTER MEASUREMENTS
    await prisma.bodyMeasurements.create({
      data: {
        date: new Date(date),
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
        createAt: dateNow,
        userId: idUser
      }
    })

    // RETURN
    status200('Medida cadastrado!')
    return res.status(204).send('Medida cadastrado!')

  // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}
