import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { iBodyMeasurements } from 'src/@types/endpoints'
import { status200, status400, status500 } from '../response/status'

const prisma = new PrismaClient()

// UPDATE MEASUREMENT
export const updateMeasurement = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idMenasurement: string = req.params.id
    const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight, idUser }: iBodyMeasurements = req.body
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
    })

    // RETURN
    status200('Medida atualizada!')
    return res.status(200).send('Medida atualizada!')

  // ERROR!
  } catch (error) {
    return res.status(400).send(status500(error))
  }
}
