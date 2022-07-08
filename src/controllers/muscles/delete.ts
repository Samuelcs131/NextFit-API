import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status500 } from '@controllers/response/status'

const prisma = new PrismaClient()

// FIND ALL MUSCLES
export const deleteOnlyMuscle = async (req: Request, res: Response) => {
  try {
    const muscleId: string = req.params.id

    const muscles = await prisma.muscles.deleteMany({
      where: { id: muscleId }
    })

    res.status(200).send(muscles)
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
