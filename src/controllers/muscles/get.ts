import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status500 } from '@controllers/response/status'

const prisma = new PrismaClient()

// FIND ALL MUSCLES
export const findAllMuscles = async (req: Request, res: Response) => {
  try {
    const muscles = await prisma.muscles.findMany()
    res.status(200).send(muscles)
    status200('Pesquisa realizada com sucesso!')
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FIND MUSCLE BY ID
export const findMuscleById = async (req: Request, res: Response) => {
  try {
    const muscleId: string = req.params.id

    const muscles = await prisma.muscles.findFirst({ where: { id: muscleId } })
    res.status(200).send(muscles)
    status200('Pesquisa realizada com sucesso!')
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
