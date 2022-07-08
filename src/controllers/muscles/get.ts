import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status500 } from '@controllers/response/status'
import { iFindOnlyMuscles } from 'src/@types/endpoints'

const prisma = new PrismaClient()

// FIND ALL MUSCLES
export const findAllMuscles = async (req: Request, res: Response) => {
  try {
    const muscles = await prisma.muscles.findMany()
    res.status(200).send(muscles)
  } catch (error) {
    res.status(500).send(status500(error))
  }
}

// FIND MUSCLE BY ID
export const findMuscleById = async (req: Request, res: Response) => {
  try {
    const { muscleId }:iFindOnlyMuscles = req.body.body || req.body

    const muscles = await prisma.muscles.findFirst({ where: { id: muscleId } })
    res.status(200).send(muscles)
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
