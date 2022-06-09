import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { iBodyMeasurements } from 'src/@types/endpoints'
import { status200, status400, status500 } from './response/status'
import dateNow from '@resources/dateNow'

const prisma = new PrismaClient()

// GET
export const index = async (req: Request, res: Response) => {
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

// GET
export const singleMeasurements = async (req: Request, res: Response) => {
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

// GET
export const userMeasurements = async (req: Request, res: Response) => {
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

// POST
export const create = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = req.params.id
    const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight }: iBodyMeasurements = req.body
    const idUserAuth: string = req.body.idUserAuth
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

// PATCH
export const update = async (req: Request, res: Response) => {
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

// DELETE
export const exclude = async (req: Request, res: Response) => {
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
