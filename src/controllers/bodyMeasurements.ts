import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import clc from 'cli-color'
import { iBodyMeasurements } from 'src/@types/endpoints'

const prisma = new PrismaClient()

// GET
export const index = async (req: Request, res: Response) => {
  try {
    // SEARCH USERS
    const measurements = await prisma.bodyMeasurements.findMany()

    // RETURN
    console.log(clc.blue('[Pesquisa realizada!]'))
    res.status(200).send({ measurements })

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
}

// POST
export const create = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idUser: string = req.params.id
    const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight }: iBodyMeasurements = req.body

    // DATE NOW
    const dateNow: string = Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short'
    }).format().split('/').reverse().join('-')

    const date: string = req.body.date.split('-').reverse().join('-')

    // REGISTER MEASUREMENTS
    const measurements = await prisma.bodyMeasurements.create({
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
        weight: Number(weight),
        createAt: new Date(dateNow),
        userId: idUser
      }
    })

    // RETURN
    console.log(clc.green('[Medida cadastrado!]'))
    return res.status(200).send({ measurements })

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
}

// PATCH
export const update = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idMenasurement: string = req.params.id
    const { abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight }: iBodyMeasurements = req.body

    const date: string = req.body.date.split('-').reverse().join('-')

    // REGISTER MEASUREMENTS
    const measurements = await prisma.bodyMeasurements.update({
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
    console.log(clc.green('[Medida atualizada!]'))
    return res.status(200).send({ measurements })

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
}

// DELETE
export const exclude = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idMenasurement: string = req.params.id

    // REGISTER MEASUREMENTS
    await prisma.bodyMeasurements.delete({
      where: { id: idMenasurement }
    })

    // RETURN
    console.log(clc.green('[Medida excluida!]'))
    return res.status(200).send('Medida excluida!')

  // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    return res.status(400).json({ status: error })
  }
}
