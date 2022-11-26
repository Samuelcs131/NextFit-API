import { Request, Response } from 'express'
import { BodyMeasurements, PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '../response/status'

const prisma = new PrismaClient()

// UPDATE MEASUREMENT
export const updateMeasurement = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idMenasurement: string = req.params.id
    const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight }: BodyMeasurements = req.body
    const idUser: string = req.params.id
    const date: string = req.body.date.split('-').reverse().join('-')
    const idUserAuth = req.body.idUserAuth
    const inputs = [abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight]

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
    await prisma.bodyMeasurements.update({
      where: { id: idMenasurement },
      data: {
        date: new Date(date),
        abdomen: Number(abdomen),
        breastplate: Number(breastplate),
        deltoid: Number(deltoid),
        gluteal: Number(gluteal),
        leftArm: Number(leftArm),
        leftCalf: Number(leftCalf),
        leftForearm: Number(leftForearm),
        leftThigh: Number(leftThigh),
        rightArm: Number(rightArm),
        rightCalf: Number(rightCalf),
        rightForearm: Number(rightForearm),
        rightThigh: Number(rightThigh),
        weight: Number(weight)
      }
    })

    // RETURN
    status200('Medida atualizada!')
    return res.status(200).send('Medida atualizada!')

  // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}
