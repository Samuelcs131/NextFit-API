import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { status200, status500 } from '@controllers/response/status'

const prisma = new PrismaClient()

// DELETE ONLY MUSCLE
export const deleteOnlyMuscle = async (req: Request, res: Response) => {
  try {
    const muscleId: string = req.params.id

    await prisma.muscles.delete({
      where: { id: muscleId }
    })

    res.status(204).send(status200('Excluido com sucesso!'))
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
