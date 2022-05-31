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
    res.status(200).send(measurements)

    // ERROR!
  } catch (error) {
    console.log(clc.bgRed('Erro:'), error)
    res.status(400).send({ status: error })
  }
}

// GET
export const singleBodyMeasurements = async (req: Request, res: Response) => {
  try {
    // PARAMS
    const idMeasurements: string = req.params.id
    // SEARCH USERS
    const measurements = await prisma.bodyMeasurements.findUnique({
      where: { id: idMeasurements }
    })

    // RETURN
    console.log(clc.blue('[Pesquisa realizada!]'))
    res.status(200).send(measurements)

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
    const inputs = [abdomen, breastplate, deltoid, gluteal, leftArm, leftCalf, leftForearm, leftThigh, rightArm, rightCalf, rightForearm, rightThigh, weight]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (typeof inputs[num] === 'string') {
        console.log(clc.bgRed('Erro: Só seram aceitas medidas em formato de númerico!'))
        return res.status(400).send('Erro: Só seram aceitas medidas em formato de númerico!')
      }

      if (inputs[num] === null || inputs[num] === undefined) {
        console.log(clc.bgRed('Erro: Preencha todos os campos!'))
        return res.status(400).send('Erro: Preencha todos os campos!')
      }
    }

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
    return res.status(200).send(measurements)

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
    const idMeasurements: string = req.params.id

    // REGISTER MEASUREMENTS
    await prisma.bodyMeasurements.delete({
      where: { id: idMeasurements }
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
